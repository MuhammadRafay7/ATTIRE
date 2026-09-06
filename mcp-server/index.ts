import fs from "node:fs";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import {
  SectionSchemas,
  type SectionName,
  GeneralSchema,
  HeroSchema,
  StatsSchema,
  FeaturesSchema,
  ProcessSchema,
  MaterialsSchema,
  CompanySchema,
  TestimonialsSchema,
  MaterialItemSchema,
  TestimonialItemSchema,
} from "../src/lib/schemas.js";

// Load environment variables from .env.local or .env if present
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const envFile of envFiles) {
    const envPath = path.resolve(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...rest] = trimmed.split("=");
          const val = rest.join("=").trim().replace(/^['"](.*)['"]$/, "$1");
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const CONTENT_DIR = path.resolve(process.cwd(), "src/content");
const BACKUP_DIR = path.resolve(process.cwd(), ".content-backups");
const IMAGES_DIR = path.resolve(process.cwd(), "public/images");

const EXPECTED_SECRET_KEY = process.env.ATTIRE_MCP_KEY || "rafay";
let isSessionAuthenticated = false;

// If ATTIRE_MCP_CLIENT_KEY or ATTIRE_MCP_KEY is provided in the process env and matches, mark session as authenticated
if (process.env.ATTIRE_MCP_CLIENT_KEY === EXPECTED_SECRET_KEY || process.env.ATTIRE_MCP_KEY === EXPECTED_SECRET_KEY) {
  isSessionAuthenticated = true;
}

function ensureDirectories() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

ensureDirectories();

function checkAuth(providedKey?: string): { success: boolean; message?: string } {
  if (isSessionAuthenticated) {
    return { success: true };
  }
  if (providedKey && providedKey === EXPECTED_SECRET_KEY) {
    isSessionAuthenticated = true;
    return { success: true };
  }
  return {
    success: false,
    message: "Unauthorized. Authentication required. Call 'authenticate({ password })' with the valid ATTIRE_MCP_KEY to make changes.",
  };
}

function readSectionFile<T = unknown>(section: SectionName): T {
  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Content file not found for section: ${section}`);
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function backupSection(section: SectionName) {
  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  if (fs.existsSync(filePath)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(BACKUP_DIR, `${section}-${timestamp}.json`);
    fs.copyFileSync(filePath, backupFile);
  }
}

function writeSectionFile(section: SectionName, data: unknown): { success: boolean; message: string } {
  const schema = SectionSchemas[section];
  if (!schema) {
    throw new Error(`Unknown section name: ${section}`);
  }

  // Validate with Zod before writing
  const parseResult = schema.safeParse(data);
  if (!parseResult.success) {
    const errors = parseResult.error.issues.map((i) => `Path [${i.path.join(".")}]: ${i.message}`).join("\n");
    throw new Error(`Content validation failed for section '${section}':\n${errors}`);
  }

  // Backup current state
  backupSection(section);

  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  fs.writeFileSync(filePath, JSON.stringify(parseResult.data, null, 2), "utf-8");

  return {
    success: true,
    message: `Section '${section}' successfully updated and verified. Fast Refresh will update active pages.`,
  };
}

// Create MCP Server instance
const server = new McpServer({
  name: "attire-services-cms",
  version: "1.0.0",
});

// Tool: Authenticate
server.tool(
  "authenticate",
  "Authenticate with the Attire Services CMS using your secret security password / key to unlock editing permissions.",
  {
    password: z.string().describe("The secret password or API key configured in ATTIRE_MCP_KEY"),
  },
  async ({ password }) => {
    if (password === EXPECTED_SECRET_KEY) {
      isSessionAuthenticated = true;
      return {
        content: [
          {
            type: "text",
            text: "✅ Authentication successful. Full write and editing access is now unlocked for this session.",
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: "❌ Authentication failed. Invalid password. Please check your ATTIRE_MCP_KEY.",
        },
      ],
      isError: true,
    };
  }
);

// Tool: List Sections
server.tool(
  "list_sections",
  "List all editable site sections with descriptions and file details.",
  {},
  async () => {
    const sections: Record<string, { description: string; exists: boolean; sizeBytes: number }> = {
      general: {
        description: "Branding, site name, nav links, contact emails/phones, office desks, footer text, accreditations, legal lines",
        exists: fs.existsSync(path.join(CONTENT_DIR, "general.json")),
        sizeBytes: fs.existsSync(path.join(CONTENT_DIR, "general.json")) ? fs.statSync(path.join(CONTENT_DIR, "general.json")).size : 0,
      },
      hero: {
        description: "Hero headline, highlight phrase, lede copy, CTA buttons, guarantee badges, interactive facility showcase stations",
        exists: fs.existsSync(path.join(CONTENT_DIR, "hero.json")),
        sizeBytes: fs.existsSync(path.join(CONTENT_DIR, "hero.json")) ? fs.statSync(path.join(CONTENT_DIR, "hero.json")).size : 0,
      },
      stats: {
        description: "High-level metrics (Years trading, mills contracted, TEU shipped, first-pass clearance rate)",
        exists: fs.existsSync(path.join(CONTENT_DIR, "stats.json")),
        sizeBytes: fs.existsSync(path.join(CONTENT_DIR, "stats.json")) ? fs.statSync(path.join(CONTENT_DIR, "stats.json")).size : 0,
      },
      features: {
        description: "6 core sourcing capabilities/pillars, bullet points, and accredited laboratory testing matrix",
        exists: fs.existsSync(path.join(CONTENT_DIR, "features.json")),
        sizeBytes: fs.existsSync(path.join(CONTENT_DIR, "features.json")) ? fs.statSync(path.join(CONTENT_DIR, "features.json")).size : 0,
      },
      process: {
        description: "4-stage trade protocol steps, sample document breakdown items, and risk mitigation engineering cards",
        exists: fs.existsSync(path.join(CONTENT_DIR, "process.json")),
        sizeBytes: fs.existsSync(path.join(CONTENT_DIR, "process.json")) ? fs.statSync(path.join(CONTENT_DIR, "process.json")).size : 0,
      },
      materials: {
        description: "Textile catalog (fabric constructions, weave, yarn, weight, shrinkage, finish), fiber standards, and weight conversion table",
        exists: fs.existsSync(path.join(CONTENT_DIR, "materials.json")),
        sizeBytes: fs.existsSync(path.join(CONTENT_DIR, "materials.json")) ? fs.statSync(path.join(CONTENT_DIR, "materials.json")).size : 0,
      },
      company: {
        description: "Company origin story, merchant trading charter rules, and factory floor inspection program",
        exists: fs.existsSync(path.join(CONTENT_DIR, "company.json")),
        sizeBytes: fs.existsSync(path.join(CONTENT_DIR, "company.json")) ? fs.statSync(path.join(CONTENT_DIR, "company.json")).size : 0,
      },
      testimonials: {
        description: "Buyer testimonials, quotes, roles, sectors, order scales, and verified impacts",
        exists: fs.existsSync(path.join(CONTENT_DIR, "testimonials.json")),
        sizeBytes: fs.existsSync(path.join(CONTENT_DIR, "testimonials.json")) ? fs.statSync(path.join(CONTENT_DIR, "testimonials.json")).size : 0,
      },
    };

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              authenticated: isSessionAuthenticated,
              sections,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Tool: Get Section Content
server.tool(
  "get_section",
  "Get the full content JSON for a specific site section, or 'all' to inspect everything.",
  {
    section: z.enum([
      "general",
      "hero",
      "stats",
      "features",
      "process",
      "materials",
      "company",
      "testimonials",
      "all",
    ]).describe("The name of the section to retrieve"),
  },
  async ({ section }) => {
    try {
      if (section === "all") {
        const allSections = Object.keys(SectionSchemas) as SectionName[];
        const result: Record<string, unknown> = {};
        for (const s of allSections) {
          result[s] = readSectionFile(s);
        }
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      const data = readSectionFile(section as SectionName);
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `Error reading section: ${msg}` }],
        isError: true,
      };
    }
  }
);

// Tool: Update Section Content
server.tool(
  "update_section",
  "Update the complete content JSON for a section with automatic Zod schema validation and backup creation.",
  {
    section: z.enum([
      "general",
      "hero",
      "stats",
      "features",
      "process",
      "materials",
      "company",
      "testimonials",
    ]).describe("The section name to update"),
    content: z.record(z.string(), z.any()).or(z.array(z.any())).describe("The new complete JSON content for the section"),
    password: z.string().optional().describe("Authentication password if not already authenticated"),
  },
  async ({ section, content, password }) => {
    const auth = checkAuth(password);
    if (!auth.success) {
      return {
        content: [{ type: "text", text: auth.message! }],
        isError: true,
      };
    }

    try {
      const res = writeSectionFile(section as SectionName, content);
      return {
        content: [{ type: "text", text: `✅ ${res.message}` }],
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `❌ Failed to update section '${section}':\n${msg}` }],
        isError: true,
      };
    }
  }
);

// Tool: Update Hero Content
server.tool(
  "update_hero",
  "Convenience tool to update the hero headline, lede copy, CTA buttons, guarantee tags, or showcase stations.",
  {
    headlineLead: z.string().optional().describe("First part of headline, e.g. 'Direct Principal Apparel Trading, Handled on Our'"),
    headlineHighlight: z.string().optional().describe("Highlighted phrase, e.g. 'Own Balance Sheet'"),
    lede: z.string().optional().describe("Main subtitle/paragraph text"),
    primaryButtonText: z.string().optional().describe("Primary button text"),
    primaryButtonHref: z.string().optional().describe("Primary button link URL"),
    secondaryButtonText: z.string().optional().describe("Secondary button text"),
    secondaryButtonHref: z.string().optional().describe("Secondary button link URL"),
    password: z.string().optional().describe("Authentication password if not already authenticated"),
  },
  async ({
    headlineLead,
    headlineHighlight,
    lede,
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref,
    password,
  }) => {
    const auth = checkAuth(password);
    if (!auth.success) {
      return { content: [{ type: "text", text: auth.message! }], isError: true };
    }

    try {
      const current = readSectionFile<z.infer<typeof HeroSchema>>("hero");
      if (headlineLead !== undefined) current.title.lead = headlineLead;
      if (headlineHighlight !== undefined) current.title.highlight = headlineHighlight;
      if (lede !== undefined) current.lede = lede;
      if (primaryButtonText !== undefined) current.buttons.primary.label = primaryButtonText;
      if (primaryButtonHref !== undefined) current.buttons.primary.href = primaryButtonHref;
      if (secondaryButtonText !== undefined) current.buttons.secondary.label = secondaryButtonText;
      if (secondaryButtonHref !== undefined) current.buttons.secondary.href = secondaryButtonHref;

      writeSectionFile("hero", current);
      return {
        content: [{ type: "text", text: "✅ Hero content successfully updated." }],
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text", text: `❌ ${msg}` }], isError: true };
    }
  }
);

// Tool: Update Contact Info
server.tool(
  "update_contact_info",
  "Update site contact email, phone number, operating hours, or office addresses.",
  {
    email: z.string().email().optional().describe("Primary contact email address"),
    phone: z.string().optional().describe("Primary commercial phone number"),
    hours: z.string().optional().describe("Operating hours"),
    rfqSla: z.string().optional().describe("RFQ turnaround SLA, e.g. '48h Response'"),
    password: z.string().optional().describe("Authentication password if not already authenticated"),
  },
  async ({ email, phone, hours, rfqSla, password }) => {
    const auth = checkAuth(password);
    if (!auth.success) {
      return { content: [{ type: "text", text: auth.message! }], isError: true };
    }

    try {
      const current = readSectionFile<z.infer<typeof GeneralSchema>>("general");
      if (email !== undefined) current.contact.email = email;
      if (phone !== undefined) current.contact.phone = phone;
      if (hours !== undefined) current.contact.hours = hours;
      if (rfqSla !== undefined) current.contact.rfqSla = rfqSla;

      writeSectionFile("general", current);
      return {
        content: [{ type: "text", text: "✅ Contact information successfully updated across all pages, footers, and forms." }],
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text", text: `❌ ${msg}` }], isError: true };
    }
  }
);

// Tool: Update Stats
server.tool(
  "update_stats",
  "Update key numerical statistics and milestones displayed on the homepage and company page.",
  {
    stats: StatsSchema.describe("Array of 4 statistic objects with value, unit, label, detail"),
    password: z.string().optional().describe("Authentication password if not already authenticated"),
  },
  async ({ stats, password }) => {
    const auth = checkAuth(password);
    if (!auth.success) {
      return { content: [{ type: "text", text: auth.message! }], isError: true };
    }

    try {
      writeSectionFile("stats", stats);
      return {
        content: [{ type: "text", text: "✅ Site statistics successfully updated." }],
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text", text: `❌ ${msg}` }], isError: true };
    }
  }
);

// Tool: Add or Update Material
server.tool(
  "add_or_update_material",
  "Add a new fabric to the material catalog or update an existing one by matching its 'id'.",
  {
    material: MaterialItemSchema.describe("The complete fabric specification object"),
    password: z.string().optional().describe("Authentication password if not already authenticated"),
  },
  async ({ material, password }) => {
    const auth = checkAuth(password);
    if (!auth.success) {
      return { content: [{ type: "text", text: auth.message! }], isError: true };
    }

    try {
      const current = readSectionFile<z.infer<typeof MaterialsSchema>>("materials");
      const existingIdx = current.materials.findIndex((m) => m.id === material.id);

      if (existingIdx >= 0) {
        current.materials[existingIdx] = material;
      } else {
        current.materials.push(material);
      }

      writeSectionFile("materials", current);
      return {
        content: [
          {
            type: "text",
            text: `✅ Material '${material.name}' (${material.id}) successfully ${existingIdx >= 0 ? "updated" : "added"} in the catalog.`,
          },
        ],
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text", text: `❌ ${msg}` }], isError: true };
    }
  }
);

// Tool: Delete Material
server.tool(
  "delete_material",
  "Remove a fabric construction from the material catalog by ID.",
  {
    id: z.string().describe("The material id to delete, e.g. 'denim-145'"),
    password: z.string().optional().describe("Authentication password if not already authenticated"),
  },
  async ({ id, password }) => {
    const auth = checkAuth(password);
    if (!auth.success) {
      return { content: [{ type: "text", text: auth.message! }], isError: true };
    }

    try {
      const current = readSectionFile<z.infer<typeof MaterialsSchema>>("materials");
      const filtered = current.materials.filter((m) => m.id !== id);
      if (filtered.length === current.materials.length) {
        return {
          content: [{ type: "text", text: `⚠️ Material with id '${id}' was not found.` }],
        };
      }
      current.materials = filtered;
      writeSectionFile("materials", current);
      return {
        content: [{ type: "text", text: `✅ Material '${id}' successfully removed from the catalog.` }],
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text", text: `❌ ${msg}` }], isError: true };
    }
  }
);

// Tool: Add or Update Testimonial
server.tool(
  "add_or_update_testimonial",
  "Add a new client review or update an existing testimonial.",
  {
    testimonial: TestimonialItemSchema.describe("The testimonial object with id, quote, buyer, sector, scale, impact"),
    password: z.string().optional().describe("Authentication password if not already authenticated"),
  },
  async ({ testimonial, password }) => {
    const auth = checkAuth(password);
    if (!auth.success) {
      return { content: [{ type: "text", text: auth.message! }], isError: true };
    }

    try {
      const current = readSectionFile<z.infer<typeof TestimonialsSchema>>("testimonials");
      const existingIdx = current.testimonials.findIndex((t) => t.id === testimonial.id);

      if (existingIdx >= 0) {
        current.testimonials[existingIdx] = testimonial;
      } else {
        current.testimonials.push(testimonial);
      }

      writeSectionFile("testimonials", current);
      return {
        content: [
          {
            type: "text",
            text: `✅ Testimonial for '${testimonial.buyer}' successfully ${existingIdx >= 0 ? "updated" : "added"}.`,
          },
        ],
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text", text: `❌ ${msg}` }], isError: true };
    }
  }
);

// Tool: List Images
server.tool(
  "list_images",
  "List available images and asset paths located in public/images/.",
  {},
  async () => {
    try {
      if (!fs.existsSync(IMAGES_DIR)) {
        return { content: [{ type: "text", text: "No public/images directory found." }] };
      }
      const files = fs.readdirSync(IMAGES_DIR);
      const images = files.map((file) => {
        const fullPath = path.join(IMAGES_DIR, file);
        const stat = fs.statSync(fullPath);
        return {
          filename: file,
          srcPath: `/images/${file}`,
          sizeKb: Math.round(stat.size / 1024),
        };
      });

      return {
        content: [{ type: "text", text: JSON.stringify(images, null, 2) }],
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text", text: `❌ ${msg}` }], isError: true };
    }
  }
);

// Tool: List Backups
server.tool(
  "list_backups",
  "List timestamped backups created automatically during edits for rollback purposes.",
  {},
  async () => {
    try {
      if (!fs.existsSync(BACKUP_DIR)) {
        return { content: [{ type: "text", text: "No backups found." }] };
      }
      const files = fs.readdirSync(BACKUP_DIR).sort().reverse();
      const backups = files.map((file) => {
        const stat = fs.statSync(path.join(BACKUP_DIR, file));
        return {
          filename: file,
          modified: stat.mtime.toISOString(),
          sizeBytes: stat.size,
        };
      });
      return {
        content: [{ type: "text", text: JSON.stringify(backups, null, 2) }],
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text", text: `❌ ${msg}` }], isError: true };
    }
  }
);

// Tool: Restore Backup
server.tool(
  "restore_backup",
  "Restore a specific backup file to revert a section to a previous state.",
  {
    backupFilename: z.string().describe("The filename in .content-backups/, e.g. 'hero-2025-09-06T06-00-00-000Z.json'"),
    section: z.enum([
      "general",
      "hero",
      "stats",
      "features",
      "process",
      "materials",
      "company",
      "testimonials",
    ]).describe("The target section to overwrite with the backup"),
    password: z.string().optional().describe("Authentication password if not already authenticated"),
  },
  async ({ backupFilename, section, password }) => {
    const auth = checkAuth(password);
    if (!auth.success) {
      return { content: [{ type: "text", text: auth.message! }], isError: true };
    }

    try {
      const backupPath = path.join(BACKUP_DIR, backupFilename);
      if (!fs.existsSync(backupPath)) {
        return { content: [{ type: "text", text: `❌ Backup file '${backupFilename}' not found.` }], isError: true };
      }
      const backupRaw = fs.readFileSync(backupPath, "utf-8");
      const backupJson = JSON.parse(backupRaw);

      writeSectionFile(section as SectionName, backupJson);
      return {
        content: [{ type: "text", text: `✅ Section '${section}' successfully restored from '${backupFilename}'.` }],
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { content: [{ type: "text", text: `❌ ${msg}` }], isError: true };
    }
  }
);

// Tool: Validate All Content
server.tool(
  "validate_all_content",
  "Validate all 8 content JSON files against their Zod schemas to ensure complete structural integrity.",
  {},
  async () => {
    const sections = Object.keys(SectionSchemas) as SectionName[];
    const report: Record<string, { valid: boolean; issues?: string[] }> = {};
    let allValid = true;

    for (const s of sections) {
      try {
        const data = readSectionFile(s);
        const schema = SectionSchemas[s];
        const res = schema.safeParse(data);
        if (res.success) {
          report[s] = { valid: true };
        } else {
          allValid = false;
          report[s] = {
            valid: false,
            issues: res.error.issues.map((i) => `[${i.path.join(".")}]: ${i.message}`),
          };
        }
      } catch (err: unknown) {
        allValid = false;
        report[s] = {
          valid: false,
          issues: [err instanceof Error ? err.message : String(err)],
        };
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              allValid,
              report,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Optional CLI test mode: --test-validation
if (process.argv.includes("--test-validation")) {
  const sections = Object.keys(SectionSchemas) as SectionName[];
  let failed = false;
  console.log("🔍 Validating all content JSON files against Zod schemas...");
  for (const s of sections) {
    try {
      const data = readSectionFile(s);
      SectionSchemas[s].parse(data);
      console.log(`  ✅ Section '${s}': PASSED`);
    } catch (err) {
      console.error(`  ❌ Section '${s}': FAILED`, err);
      failed = true;
    }
  }
  process.exit(failed ? 1 : 0);
}

// Start stdio transport for MCP clients
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

if (!process.argv.includes("--test-validation")) {
  main().catch((err) => {
    console.error("Fatal error running Attire Services MCP server:", err);
    process.exit(1);
  });
}
