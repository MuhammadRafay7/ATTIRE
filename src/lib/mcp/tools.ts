import fs from "node:fs";
import path from "node:path";
import {
  SectionSchemas,
  type SectionName,
  GeneralSchema,
  HeroSchema,
  StatsSchema,
  MaterialsSchema,
  TestimonialsSchema,
  MaterialItemSchema,
  TestimonialItemSchema,
} from "../schemas";
import type { z } from "zod";

const CONTENT_DIR = path.resolve(process.cwd(), "src/content");
const BACKUP_DIR = path.resolve(process.cwd(), ".content-backups");
const IMAGES_DIR = path.resolve(process.cwd(), "public/images");

function ensureDirs() {
  if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

function readSectionFile<T = unknown>(section: SectionName): T {
  ensureDirs();
  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Content file not found for section: ${section}`);
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

function backupSection(section: SectionName) {
  ensureDirs();
  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  if (fs.existsSync(filePath)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFile = path.join(BACKUP_DIR, `${section}-${timestamp}.json`);
    fs.copyFileSync(filePath, backupFile);
  }
}

function writeSectionFile(section: SectionName, data: unknown) {
  const schema = SectionSchemas[section];
  if (!schema) throw new Error(`Unknown section: ${section}`);

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `[${i.path.join(".")}]: ${i.message}`).join(", ");
    throw new Error(`Validation failed for section '${section}': ${issues}`);
  }

  backupSection(section);
  const filePath = path.join(CONTENT_DIR, `${section}.json`);
  fs.writeFileSync(filePath, JSON.stringify(parsed.data, null, 2), "utf-8");
  return { success: true, message: `Section '${section}' successfully updated and verified.` };
}

export interface McpToolDescriptor {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: {
    readOnlyHint?: boolean;
    destructiveHint?: boolean;
  };
}

export function listTools(): McpToolDescriptor[] {
  return [
    {
      name: "list_sections",
      description: "List all editable site content sections (general, hero, stats, features, process, materials, company, testimonials) and file metadata.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "get_section",
      description: "Retrieve the complete content JSON for a specific section or 'all'.",
      inputSchema: {
        type: "object",
        properties: {
          section: {
            type: "string",
            enum: ["general", "hero", "stats", "features", "process", "materials", "company", "testimonials", "all"],
            description: "The section name to retrieve",
          },
        },
        required: ["section"],
      },
      annotations: { readOnlyHint: true },
    },
    {
      name: "update_section",
      description: "Update the full JSON content of a section with automatic Zod validation and backup creation.",
      inputSchema: {
        type: "object",
        properties: {
          section: {
            type: "string",
            enum: ["general", "hero", "stats", "features", "process", "materials", "company", "testimonials"],
            description: "The target section name",
          },
          content: {
            description: "The full valid JSON data for this section",
          },
        },
        required: ["section", "content"],
      },
      annotations: { readOnlyHint: false, destructiveHint: true },
    },
    {
      name: "update_hero",
      description: "Convenience tool to update hero title, highlighted phrase, lede copy, CTA buttons, and guarantee tags.",
      inputSchema: {
        type: "object",
        properties: {
          headlineLead: { type: "string", description: "First part of main headline" },
          headlineHighlight: { type: "string", description: "Highlighted phrase" },
          lede: { type: "string", description: "Subtitle/lede paragraph" },
          primaryButtonText: { type: "string", description: "Primary button label" },
          primaryButtonHref: { type: "string", description: "Primary button target URL" },
          secondaryButtonText: { type: "string", description: "Secondary button label" },
          secondaryButtonHref: { type: "string", description: "Secondary button target URL" },
        },
      },
      annotations: { readOnlyHint: false },
    },
    {
      name: "update_contact_info",
      description: "Update site contact email, commercial telephone, operating hours, and RFQ response SLA.",
      inputSchema: {
        type: "object",
        properties: {
          email: { type: "string", description: "Contact email" },
          phone: { type: "string", description: "Phone number" },
          hours: { type: "string", description: "Business hours" },
          rfqSla: { type: "string", description: "RFQ SLA (e.g. '48h Response')" },
        },
      },
      annotations: { readOnlyHint: false },
    },
    {
      name: "update_stats",
      description: "Update business milestones and statistics across the website.",
      inputSchema: {
        type: "object",
        properties: {
          stats: {
            type: "array",
            items: {
              type: "object",
              properties: {
                value: { type: "string" },
                unit: { type: "string" },
                label: { type: "string" },
                detail: { type: "string" },
              },
              required: ["value", "unit", "label", "detail"],
            },
          },
        },
        required: ["stats"],
      },
      annotations: { readOnlyHint: false },
    },
    {
      name: "add_or_update_material",
      description: "Add a new fabric construction to the material catalog or update an existing one by matching its 'id'.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          category: { type: "string", enum: ["woven", "denim", "knit", "heavy"] },
          weave: { type: "string" },
          comp: { type: "string" },
          yarnCount: { type: "string" },
          weight: { type: "string" },
          weightOz: { type: "string" },
          moq: { type: "string" },
          shrinkage: { type: "string" },
          tariff: { type: "string" },
          image: { type: "string" },
          finish: { type: "string" },
        },
        required: ["id", "name", "category", "weave", "comp", "yarnCount", "weight", "weightOz", "moq", "shrinkage", "tariff", "image", "finish"],
      },
      annotations: { readOnlyHint: false },
    },
    {
      name: "delete_material",
      description: "Remove a fabric construction from the material catalog by ID.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string", description: "Material ID to delete" },
        },
        required: ["id"],
      },
      annotations: { readOnlyHint: false, destructiveHint: true },
    },
    {
      name: "add_or_update_testimonial",
      description: "Add or edit a client review and impact metrics.",
      inputSchema: {
        type: "object",
        properties: {
          id: { type: "string" },
          quote: { type: "string" },
          buyer: { type: "string" },
          sector: { type: "string" },
          scale: { type: "string" },
          impact: { type: "string" },
        },
        required: ["id", "quote", "buyer", "sector", "scale", "impact"],
      },
      annotations: { readOnlyHint: false },
    },
    {
      name: "list_images",
      description: "List all image assets available in public/images/.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "list_backups",
      description: "List automatic timestamped backups available for rollback.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "restore_backup",
      description: "Restore a section from a previous backup file.",
      inputSchema: {
        type: "object",
        properties: {
          backupFilename: { type: "string", description: "Backup filename in .content-backups/" },
          section: {
            type: "string",
            enum: ["general", "hero", "stats", "features", "process", "materials", "company", "testimonials"],
          },
        },
        required: ["backupFilename", "section"],
      },
      annotations: { readOnlyHint: false, destructiveHint: true },
    },
    {
      name: "validate_all_content",
      description: "Run full schema verification on all site content JSON files.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
  ];
}

export async function executeTool(name: string, args: Record<string, unknown>): Promise<{ text: string; isError?: boolean }> {
  try {
    switch (name) {
      case "list_sections": {
        const sections: Record<string, unknown> = {
          general: "Branding, contact info, office desks, navigation, footers, accreditations",
          hero: "Headline, lede copy, CTA buttons, guarantee badges, showcase stations & images",
          stats: "Numerical trading milestones and figures",
          features: "6 core sourcing capabilities and laboratory test matrix",
          process: "4-stage protocol milestones and risk engineering",
          materials: "Fabric archive, fiber standards, weight conversions",
          company: "Trading house history, charter rules, factory visits",
          testimonials: "Buyer quotes and verified impacts",
        };
        return { text: JSON.stringify({ sections }, null, 2) };
      }

      case "get_section": {
        const section = args.section as string;
        if (section === "all") {
          const allSections = Object.keys(SectionSchemas) as SectionName[];
          const result: Record<string, unknown> = {};
          for (const s of allSections) result[s] = readSectionFile(s);
          return { text: JSON.stringify(result, null, 2) };
        }
        const data = readSectionFile(section as SectionName);
        return { text: JSON.stringify(data, null, 2) };
      }

      case "update_section": {
        const section = args.section as SectionName;
        const res = writeSectionFile(section, args.content);
        return { text: `✅ ${res.message}` };
      }

      case "update_hero": {
        const current = readSectionFile<z.infer<typeof HeroSchema>>("hero");
        if (args.headlineLead !== undefined) current.title.lead = String(args.headlineLead);
        if (args.headlineHighlight !== undefined) current.title.highlight = String(args.headlineHighlight);
        if (args.lede !== undefined) current.lede = String(args.lede);
        if (args.primaryButtonText !== undefined) current.buttons.primary.label = String(args.primaryButtonText);
        if (args.primaryButtonHref !== undefined) current.buttons.primary.href = String(args.primaryButtonHref);
        if (args.secondaryButtonText !== undefined) current.buttons.secondary.label = String(args.secondaryButtonText);
        if (args.secondaryButtonHref !== undefined) current.buttons.secondary.href = String(args.secondaryButtonHref);

        writeSectionFile("hero", current);
        return { text: "✅ Hero content successfully updated." };
      }

      case "update_contact_info": {
        const current = readSectionFile<z.infer<typeof GeneralSchema>>("general");
        if (args.email !== undefined) current.contact.email = String(args.email);
        if (args.phone !== undefined) current.contact.phone = String(args.phone);
        if (args.hours !== undefined) current.contact.hours = String(args.hours);
        if (args.rfqSla !== undefined) current.contact.rfqSla = String(args.rfqSla);

        writeSectionFile("general", current);
        return { text: "✅ Contact information successfully updated across all pages, footers, and forms." };
      }

      case "update_stats": {
        writeSectionFile("stats", args.stats);
        return { text: "✅ Site statistics successfully updated." };
      }

      case "add_or_update_material": {
        const material = MaterialItemSchema.parse(args);
        const current = readSectionFile<z.infer<typeof MaterialsSchema>>("materials");
        const idx = current.materials.findIndex((m) => m.id === material.id);
        if (idx >= 0) current.materials[idx] = material;
        else current.materials.push(material);

        writeSectionFile("materials", current);
        return { text: `✅ Material '${material.name}' (${material.id}) successfully saved in catalog.` };
      }

      case "delete_material": {
        const id = String(args.id);
        const current = readSectionFile<z.infer<typeof MaterialsSchema>>("materials");
        const filtered = current.materials.filter((m) => m.id !== id);
        if (filtered.length === current.materials.length) {
          return { text: `⚠️ Material with id '${id}' not found.` };
        }
        current.materials = filtered;
        writeSectionFile("materials", current);
        return { text: `✅ Material '${id}' successfully removed from catalog.` };
      }

      case "add_or_update_testimonial": {
        const testimonial = TestimonialItemSchema.parse(args);
        const current = readSectionFile<z.infer<typeof TestimonialsSchema>>("testimonials");
        const idx = current.testimonials.findIndex((t) => t.id === testimonial.id);
        if (idx >= 0) current.testimonials[idx] = testimonial;
        else current.testimonials.push(testimonial);

        writeSectionFile("testimonials", current);
        return { text: `✅ Testimonial for '${testimonial.buyer}' successfully saved.` };
      }

      case "list_images": {
        if (!fs.existsSync(IMAGES_DIR)) return { text: "No images folder found." };
        const files = fs.readdirSync(IMAGES_DIR).map((f) => ({
          filename: f,
          srcPath: `/images/${f}`,
          sizeKb: Math.round(fs.statSync(path.join(IMAGES_DIR, f)).size / 1024),
        }));
        return { text: JSON.stringify(files, null, 2) };
      }

      case "list_backups": {
        if (!fs.existsSync(BACKUP_DIR)) return { text: "[]" };
        const backups = fs.readdirSync(BACKUP_DIR).sort().reverse().map((f) => ({
          filename: f,
          modified: fs.statSync(path.join(BACKUP_DIR, f)).mtime.toISOString(),
          sizeBytes: fs.statSync(path.join(BACKUP_DIR, f)).size,
        }));
        return { text: JSON.stringify(backups, null, 2) };
      }

      case "restore_backup": {
        const backupFilename = String(args.backupFilename);
        const section = args.section as SectionName;
        const backupPath = path.join(BACKUP_DIR, backupFilename);
        if (!fs.existsSync(backupPath)) {
          return { text: `❌ Backup '${backupFilename}' not found.`, isError: true };
        }
        const data = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
        writeSectionFile(section, data);
        return { text: `✅ Section '${section}' restored from '${backupFilename}'.` };
      }

      case "validate_all_content": {
        const sections = Object.keys(SectionSchemas) as SectionName[];
        const report: Record<string, { valid: boolean; error?: string }> = {};
        let allValid = true;
        for (const s of sections) {
          try {
            const data = readSectionFile(s);
            SectionSchemas[s].parse(data);
            report[s] = { valid: true };
          } catch (e) {
            allValid = false;
            report[s] = { valid: false, error: e instanceof Error ? e.message : String(e) };
          }
        }
        return { text: JSON.stringify({ allValid, report }, null, 2) };
      }

      default:
        return { text: `Unknown tool: ${name}`, isError: true };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { text: `❌ Error: ${msg}`, isError: true };
  }
}
