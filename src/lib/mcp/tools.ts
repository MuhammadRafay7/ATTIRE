import fs from "node:fs";
import path from "node:path";
import { getSectionData, saveSectionData, saveUploadedImage } from "../storage";
import {
  SectionSchemas,
  type SectionName,
  GeneralSchema,
  HeroSchema,
  MaterialsSchema,
  TestimonialsSchema,
  MaterialItemSchema,
  TestimonialItemSchema,
} from "../schemas";
import type { z } from "zod";

const BACKUP_DIR = path.resolve(process.cwd(), ".content-backups");
const IMAGES_DIR = path.resolve(process.cwd(), "public/images");

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
    // ── READ TOOLS ──
    {
      name: "get_hero_content",
      description: "Read the hero section: main headline, highlighted phrase, lede copy, CTA buttons, guarantee badges, and showcase stations.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "get_contact_info",
      description: "Read contact details: email addresses, phone numbers, office desks (London, Karachi, Ho Chi Minh City), and hours.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "get_stats",
      description: "Read business statistics and milestones: years continuous trading, direct mill contracts, TEU volume, port clearance rate.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "get_materials",
      description: "Read the textile and fabric catalog: all active constructions (denim, shirting, twills, canvas, fleece), fiber standards, and weight conversion table.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "get_testimonials",
      description: "Read buyer testimonials, quotes, roles, retail sectors, and impact figures.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "get_features",
      description: "Read sourcing capabilities, 6 core pillars, and laboratory testing matrix.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "get_process",
      description: "Read the 4-stage trade protocol, milestone deliverables, sample cost sheets, and risk mitigation cards.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "get_company",
      description: "Read the company backstory, merchant trading charter rules, and mill floor visit inspection program.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "get_section",
      description: "Universal read tool to retrieve full JSON content for any section ('general', 'hero', 'stats', 'features', 'process', 'materials', 'company', 'testimonials', or 'all').",
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
      name: "list_sections",
      description: "List all editable site content sections and summary descriptions.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "list_images",
      description: "List all available image paths in public/images/.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "list_backups",
      description: "List timestamped backups available for rollback.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },
    {
      name: "validate_all_content",
      description: "Run full schema validation across all site content JSON files.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
    },

    // ── WRITE TOOLS ──
    {
      name: "update_hero",
      description: "Update the hero title, highlighted phrase, lede copy, CTA buttons, or guarantee badges.",
      inputSchema: {
        type: "object",
        properties: {
          headlineLead: { type: "string", description: "First part of headline" },
          headlineHighlight: { type: "string", description: "Highlighted phrase" },
          lede: { type: "string", description: "Main subtitle/lede paragraph" },
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
      description: "Update site contact email, phone, business hours, or RFQ response SLA.",
      inputSchema: {
        type: "object",
        properties: {
          email: { type: "string", description: "Contact email" },
          phone: { type: "string", description: "Phone number" },
          hours: { type: "string", description: "Business hours" },
          rfqSla: { type: "string", description: "RFQ SLA" },
        },
      },
      annotations: { readOnlyHint: false },
    },
    {
      name: "update_stats",
      description: "Update business milestones and statistics across the site.",
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
      description: "Add a new fabric to the catalog or update an existing one by matching its 'id'.",
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
      name: "upload_image",
      description: "Upload a binary image (in Base64 encoding) to the website. Saves to public/images/[filename] and commits to GitHub repo.",
      inputSchema: {
        type: "object",
        properties: {
          filename: { type: "string", description: "Image filename (e.g. linen-fabric.jpg, factory-floor.png)" },
          base64Data: { type: "string", description: "The base64 encoded binary image content (data URL prefix optional)" },
        },
        required: ["filename", "base64Data"],
      },
      annotations: { readOnlyHint: false },
    },
    {
      name: "update_theme_style",
      description: "Customize website style, accent color palette, or announcement banner dynamically.",
      inputSchema: {
        type: "object",
        properties: {
          accentColor: {
            type: "string",
            enum: ["brass", "emerald", "cobalt", "amber", "crimson", "indigo"],
            description: "Primary accent hue",
          },
          styleMode: {
            type: "string",
            enum: ["editorial", "modern", "minimal", "industrial"],
            description: "Visual typography and layout density mood",
          },
          announcementBanner: {
            type: "object",
            properties: {
              enabled: { type: "boolean" },
              badge: { type: "string" },
              text: { type: "string" },
              href: { type: "string" },
            },
          },
          customCss: {
            type: "string",
            description: "Custom CSS code to apply globally",
          },
        },
      },
      annotations: { readOnlyHint: false },
    },
    {
      name: "update_branding",
      description: "Update site brand name, tagline, description, custom logo image, and favicon URL.",
      inputSchema: {
        type: "object",
        properties: {
          name: { type: "string", description: "Company / Site name" },
          tagline: { type: "string", description: "Brand descriptor / tagline" },
          description: { type: "string", description: "Institutional overview description" },
          logoImage: { type: "string", description: "Custom logo image URL/path (e.g. /images/logo.png)" },
          faviconUrl: { type: "string", description: "Favicon URL/path" },
        },
      },
      annotations: { readOnlyHint: false },
    },
    {
      name: "update_custom_css",
      description: "Directly edit or inject custom CSS rules across the live website.",
      inputSchema: {
        type: "object",
        properties: {
          css: { type: "string", description: "Global CSS rules to inject and render" },
        },
        required: ["css"],
      },
      annotations: { readOnlyHint: false },
    },
    {
      name: "update_section",
      description: "Update the full JSON content of a section with Zod validation.",
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
  ];
}

export async function executeTool(name: string, args: Record<string, unknown>): Promise<{ text: string; isError?: boolean }> {
  try {
    switch (name) {
      // Direct Read Tools
      case "get_hero_content": {
        const data = await getSectionData("hero");
        return { text: JSON.stringify(data, null, 2) };
      }
      case "get_contact_info": {
        const data = await getSectionData("general");
        return { text: JSON.stringify(data, null, 2) };
      }
      case "get_stats": {
        const data = await getSectionData("stats");
        return { text: JSON.stringify(data, null, 2) };
      }
      case "get_materials": {
        const data = await getSectionData("materials");
        return { text: JSON.stringify(data, null, 2) };
      }
      case "get_testimonials": {
        const data = await getSectionData("testimonials");
        return { text: JSON.stringify(data, null, 2) };
      }
      case "get_features": {
        const data = await getSectionData("features");
        return { text: JSON.stringify(data, null, 2) };
      }
      case "get_process": {
        const data = await getSectionData("process");
        return { text: JSON.stringify(data, null, 2) };
      }
      case "get_company": {
        const data = await getSectionData("company");
        return { text: JSON.stringify(data, null, 2) };
      }

      case "list_sections": {
        const sections: Record<string, unknown> = {
          general: "Branding, contact info, office desks, navigation, footers, theme styles, accreditations",
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
        const section = (args.section as string) || "hero";
        if (section === "all") {
          const allSections = Object.keys(SectionSchemas) as SectionName[];
          const result: Record<string, unknown> = {};
          for (const s of allSections) {
            result[s] = await getSectionData(s);
          }
          return { text: JSON.stringify(result, null, 2) };
        }
        const data = await getSectionData(section as SectionName);
        return { text: JSON.stringify(data, null, 2) };
      }

      case "update_section": {
        const section = args.section as SectionName;
        const res = await saveSectionData(section, args.content);
        return { text: `✅ ${res.message}` };
      }

      case "update_hero": {
        const current = await getSectionData<z.infer<typeof HeroSchema>>("hero");
        if (args.headlineLead !== undefined) current.title.lead = String(args.headlineLead);
        if (args.headlineHighlight !== undefined) current.title.highlight = String(args.headlineHighlight);
        if (args.lede !== undefined) current.lede = String(args.lede);
        if (args.primaryButtonText !== undefined) current.buttons.primary.label = String(args.primaryButtonText);
        if (args.primaryButtonHref !== undefined) current.buttons.primary.href = String(args.primaryButtonHref);
        if (args.secondaryButtonText !== undefined) current.buttons.secondary.label = String(args.secondaryButtonText);
        if (args.secondaryButtonHref !== undefined) current.buttons.secondary.href = String(args.secondaryButtonHref);

        const res = await saveSectionData("hero", current);
        return { text: `✅ ${res.message}` };
      }

      case "update_contact_info": {
        const current = await getSectionData<z.infer<typeof GeneralSchema>>("general");
        if (args.email !== undefined) {
          const newEmail = String(args.email);
          current.contact.email = newEmail;
          for (const col of current.footerColumns) {
            for (const link of col.links) {
              if (link.href.startsWith("mailto:")) {
                link.href = `mailto:${newEmail}`;
                link.label = `London: ${newEmail}`;
              }
            }
          }
        }
        if (args.phone !== undefined) current.contact.phone = String(args.phone);
        if (args.hours !== undefined) current.contact.hours = String(args.hours);
        if (args.rfqSla !== undefined) current.contact.rfqSla = String(args.rfqSla);

        const res = await saveSectionData("general", current);
        return { text: `✅ ${res.message}` };
      }

      case "update_theme_style": {
        const current = await getSectionData<z.infer<typeof GeneralSchema>>("general");
        if (!current.theme) {
          current.theme = {
            accentColor: "brass",
            styleMode: "editorial",
            announcementBanner: { enabled: false, badge: "Notice", text: "", href: "/contact" },
            customCss: "",
          };
        }
        if (args.accentColor !== undefined) {
          current.theme.accentColor = args.accentColor as any;
        }
        if (args.styleMode !== undefined) {
          current.theme.styleMode = args.styleMode as any;
        }
        if (args.announcementBanner !== undefined && typeof args.announcementBanner === "object") {
          current.theme.announcementBanner = {
            ...current.theme.announcementBanner,
            ...(args.announcementBanner as any),
          };
        }
        if (args.customCss !== undefined) {
          current.theme.customCss = String(args.customCss);
        }

        const res = await saveSectionData("general", current);
        return { text: `✅ Website theme & styling successfully updated. ${res.message}` };
      }

      case "update_branding": {
        const current = await getSectionData<z.infer<typeof GeneralSchema>>("general");
        if (args.name !== undefined) current.site.name = String(args.name);
        if (args.tagline !== undefined) current.site.tagline = String(args.tagline);
        if (args.description !== undefined) current.site.description = String(args.description);
        if (args.logoImage !== undefined) current.site.logoImage = String(args.logoImage);
        if (args.faviconUrl !== undefined) current.site.faviconUrl = String(args.faviconUrl);

        const res = await saveSectionData("general", current);
        return { text: `✅ Website branding, logo, and identity successfully updated. ${res.message}` };
      }

      case "update_custom_css": {
        const current = await getSectionData<z.infer<typeof GeneralSchema>>("general");
        if (!current.theme) {
          current.theme = {
            accentColor: "brass",
            styleMode: "editorial",
            announcementBanner: { enabled: false, badge: "Notice", text: "", href: "/contact" },
            customCss: "",
          };
        }
        current.theme.customCss = String(args.css || "");
        const res = await saveSectionData("general", current);
        return { text: `✅ Custom CSS successfully applied across the website. ${res.message}` };
      }

      case "upload_image": {
        const filename = String(args.filename);
        const base64Data = String(args.base64Data);
        const res = await saveUploadedImage(filename, base64Data);
        return {
          text: `✅ ${res.message}\nImage URL to use in content: ${res.imagePath}`,
        };
      }

      case "update_stats": {
        const res = await saveSectionData("stats", args.stats);
        return { text: `✅ ${res.message}` };
      }

      case "add_or_update_material": {
        const material = MaterialItemSchema.parse(args);
        const current = await getSectionData<z.infer<typeof MaterialsSchema>>("materials");
        const idx = current.materials.findIndex((m) => m.id === material.id);
        if (idx >= 0) current.materials[idx] = material;
        else current.materials.push(material);

        const res = await saveSectionData("materials", current);
        return { text: `✅ Material '${material.name}' (${material.id}) saved in catalog. ${res.message}` };
      }

      case "delete_material": {
        const id = String(args.id);
        const current = await getSectionData<z.infer<typeof MaterialsSchema>>("materials");
        const filtered = current.materials.filter((m) => m.id !== id);
        if (filtered.length === current.materials.length) {
          return { text: `⚠️ Material with id '${id}' not found.` };
        }
        current.materials = filtered;
        const res = await saveSectionData("materials", current);
        return { text: `✅ Material '${id}' removed from catalog. ${res.message}` };
      }

      case "add_or_update_testimonial": {
        const testimonial = TestimonialItemSchema.parse(args);
        const current = await getSectionData<z.infer<typeof TestimonialsSchema>>("testimonials");
        const idx = current.testimonials.findIndex((t) => t.id === testimonial.id);
        if (idx >= 0) current.testimonials[idx] = testimonial;
        else current.testimonials.push(testimonial);

        const res = await saveSectionData("testimonials", current);
        return { text: `✅ Testimonial for '${testimonial.buyer}' saved. ${res.message}` };
      }

      case "list_images": {
        try {
          if (fs.existsSync(IMAGES_DIR)) {
            const files = fs.readdirSync(IMAGES_DIR).map((f) => ({
              filename: f,
              srcPath: `/images/${f}`,
              sizeKb: Math.round(fs.statSync(path.join(IMAGES_DIR, f)).size / 1024),
            }));
            return { text: JSON.stringify(files, null, 2) };
          }
        } catch {}
        return { text: JSON.stringify([
          { filename: "weaving.jpg", srcPath: "/images/weaving.jpg" },
          { filename: "maritime.jpg", srcPath: "/images/maritime.jpg" },
          { filename: "inspection.jpg", srcPath: "/images/inspection.jpg" },
          { filename: "denim.jpg", srcPath: "/images/denim.jpg" },
          { filename: "poplin.jpg", srcPath: "/images/poplin.jpg" },
          { filename: "twill.jpg", srcPath: "/images/twill.jpg" },
          { filename: "oxford.jpg", srcPath: "/images/oxford.jpg" },
          { filename: "canvas.jpg", srcPath: "/images/canvas.jpg" },
          { filename: "jersey.jpg", srcPath: "/images/jersey.jpg" },
          { filename: "corduroy.jpg", srcPath: "/images/corduroy.jpg" },
          { filename: "flannel.jpg", srcPath: "/images/flannel.jpg" },
        ], null, 2) };
      }

      case "list_backups": {
        try {
          if (fs.existsSync(BACKUP_DIR)) {
            const backups = fs.readdirSync(BACKUP_DIR).sort().reverse().map((f) => ({
              filename: f,
              modified: fs.statSync(path.join(BACKUP_DIR, f)).mtime.toISOString(),
              sizeBytes: fs.statSync(path.join(BACKUP_DIR, f)).size,
            }));
            return { text: JSON.stringify(backups, null, 2) };
          }
        } catch {}
        return { text: "[]" };
      }

      case "restore_backup": {
        const backupFilename = String(args.backupFilename);
        const section = args.section as SectionName;
        const backupPath = path.join(BACKUP_DIR, backupFilename);
        if (!fs.existsSync(backupPath)) {
          return { text: `❌ Backup '${backupFilename}' not found.`, isError: true };
        }
        const data = JSON.parse(fs.readFileSync(backupPath, "utf-8"));
        const res = await saveSectionData(section, data);
        return { text: `✅ Section '${section}' restored from '${backupFilename}'. ${res.message}` };
      }

      case "validate_all_content": {
        const sections = Object.keys(SectionSchemas) as SectionName[];
        const report: Record<string, { valid: boolean; error?: string }> = {};
        let allValid = true;
        for (const s of sections) {
          try {
            const data = await getSectionData(s);
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
