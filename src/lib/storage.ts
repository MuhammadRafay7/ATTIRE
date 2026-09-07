import fs from "node:fs";
import path from "node:path";
import generalData from "@/content/general.json";
import heroData from "@/content/hero.json";
import statsData from "@/content/stats.json";
import featuresData from "@/content/features.json";
import processData from "@/content/process.json";
import materialsData from "@/content/materials.json";
import companyData from "@/content/company.json";
import testimonialsData from "@/content/testimonials.json";
import { SectionSchemas, type SectionName } from "./schemas";

// In-memory cache layer for superfast synchronous & serverless access
export const memoryStore: Record<SectionName, unknown> = {
  general: generalData,
  hero: heroData,
  stats: statsData,
  features: featuresData,
  process: processData,
  materials: materialsData,
  company: companyData,
  testimonials: testimonialsData,
};

const CONTENT_DIR = path.resolve(process.cwd(), "src/content");
const BACKUP_DIR = path.resolve(process.cwd(), ".content-backups");

function getKvConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    return { url: url.replace(/\/$/, ""), token };
  }
  return null;
}

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || process.env.GITHUB_PAT;
  const repo = process.env.GITHUB_REPO || "MuhammadRafay7/ATTIRE";
  const branch = process.env.GITHUB_BRANCH || "main";
  if (token) {
    return { token: token.trim(), repo: repo.trim(), branch: branch.trim() };
  }
  return null;
}

/**
 * Fetch a section from KV Store if available
 */
async function fetchFromKV<T>(section: SectionName): Promise<T | null> {
  const kv = getKvConfig();
  if (!kv) return null;

  try {
    const res = await fetch(`${kv.url}/get/attire_section_${section}`, {
      headers: {
        Authorization: `Bearer ${kv.token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const json = await res.json();
    if (!json || json.result === null || json.result === undefined) return null;

    let parsed = json.result;
    if (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed);
      } catch {
        // use parsed as-is if string
      }
    }

    const schema = SectionSchemas[section];
    const validation = schema.safeParse(parsed);
    if (validation.success) {
      memoryStore[section] = validation.data;
      return validation.data as T;
    }
  } catch {
    // Fail silently to local fallback
  }

  return null;
}

/**
 * Fetch a section directly from GitHub repository if GITHUB_TOKEN is available
 */
async function fetchFromGitHub<T>(section: SectionName): Promise<T | null> {
  const gh = getGitHubConfig();
  if (!gh) return null;

  try {
    const filePath = `src/content/${section}.json`;
    const url = `https://api.github.com/repos/${gh.repo}/contents/${filePath}?ref=${gh.branch}&t=${Date.now()}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${gh.token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "Attire-Services-CMS",
      },
      cache: "no-store",
    });

    if (res.ok) {
      const fileInfo = await res.json();
      if (fileInfo.content && fileInfo.encoding === "base64") {
        const decoded = Buffer.from(fileInfo.content, "base64").toString("utf-8");
        const parsed = JSON.parse(decoded);
        const schema = SectionSchemas[section];
        const validation = schema.safeParse(parsed);
        if (validation.success) {
          memoryStore[section] = validation.data;
          return validation.data as T;
        }
      }
    }
  } catch {
    // Fail silently
  }

  return null;
}

/**
 * Persist section data to KV Store via REST
 */
async function saveToKV<T>(section: SectionName, data: T): Promise<boolean> {
  const kv = getKvConfig();
  if (!kv) return false;

  try {
    const res = await fetch(`${kv.url}/set/attire_section_${section}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kv.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Commit updated JSON to GitHub repository synchronously to ensure serverless execution
 */
async function commitToGitHub(section: SectionName, data: unknown): Promise<{ success: boolean; error?: string }> {
  const gh = getGitHubConfig();
  if (!gh) return { success: false, error: "GITHUB_TOKEN is not set" };

  try {
    const filePath = `src/content/${section}.json`;
    const getUrl = `https://api.github.com/repos/${gh.repo}/contents/${filePath}?ref=${gh.branch}&t=${Date.now()}`;
    
    let sha: string | undefined;
    try {
      const getRes = await fetch(getUrl, {
        headers: {
          Authorization: `Bearer ${gh.token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "User-Agent": "Attire-Services-CMS",
        },
        cache: "no-store",
      });
      if (getRes.ok) {
        const fileInfo = await getRes.json();
        sha = fileInfo.sha;
      }
    } catch {
      // sha stays undefined
    }

    const putUrl = `https://api.github.com/repos/${gh.repo}/contents/${filePath}`;
    const contentBase64 = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");

    const putRes = await fetch(putUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${gh.token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "Attire-Services-CMS",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Update ${section}.json via Attire MCP Assistant`,
        content: contentBase64,
        sha,
        branch: gh.branch,
      }),
      cache: "no-store",
    });

    if (!putRes.ok) {
      const errText = await putRes.text();
      return { success: false, error: `GitHub API error ${putRes.status}: ${errText}` };
    }

    return { success: true };
  } catch (err: unknown) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Local filesystem read/write helpers
 */
function tryEnsureDirs() {
  try {
    if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });
    if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
  } catch {
    // Read-only serverless filesystem
  }
}

function backupSection(section: SectionName) {
  try {
    tryEnsureDirs();
    const filePath = path.join(CONTENT_DIR, `${section}.json`);
    if (fs.existsSync(filePath) && fs.existsSync(BACKUP_DIR)) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupFile = path.join(BACKUP_DIR, `${section}-${timestamp}.json`);
      fs.copyFileSync(filePath, backupFile);
    }
  } catch {
    // Ignored in serverless
  }
}

/**
 * Universal content getter with multi-tier fallback:
 * 1. Serverless KV Store (live synced overrides)
 * 2. GitHub REST API (live Git file read)
 * 3. In-memory cache
 * 4. Local filesystem (if available)
 * 5. Bundled JSON defaults
 */
export async function getSectionData<T>(section: SectionName): Promise<T> {
  // 1. Try KV store
  const kvData = await fetchFromKV<T>(section);
  if (kvData) {
    return kvData;
  }

  // 2. Try GitHub live contents
  const ghData = await fetchFromGitHub<T>(section);
  if (ghData) {
    return ghData;
  }

  // 3. Try in-memory store
  if (memoryStore[section]) {
    return memoryStore[section] as T;
  }

  // 4. Try reading local file
  try {
    const filePath = path.join(CONTENT_DIR, `${section}.json`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw);
      memoryStore[section] = parsed;
      return parsed as T;
    }
  } catch {
    // Fall back
  }

  return memoryStore[section] as T;
}

/**
 * Synchronous getter for static fallbacks
 */
export function getSectionDataSync<T>(section: SectionName): T {
  return (memoryStore[section] || {}) as T;
}

/**
 * Save section data with instant Next.js cache purging, KV update, GitHub commit, and local file write
 */
export async function saveSectionData<T>(section: SectionName, rawData: unknown): Promise<{ success: boolean; message: string; data: T }> {
  const schema = SectionSchemas[section];
  if (!schema) {
    throw new Error(`Unknown section: ${section}`);
  }

  const parsed = schema.safeParse(rawData);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `[${i.path.join(".")}]: ${i.message}`).join(", ");
    throw new Error(`Validation failed for section '${section}': ${issues}`);
  }

  const validData = parsed.data as T;

  // 1. Update in-memory state immediately
  memoryStore[section] = validData;

  // 2. Persist to local filesystem (if writable)
  try {
    tryEnsureDirs();
    backupSection(section);
    const filePath = path.join(CONTENT_DIR, `${section}.json`);
    fs.writeFileSync(filePath, JSON.stringify(validData, null, 2), "utf-8");
  } catch {
    // Read-only serverless environment
  }

  // 3. Persist to Serverless KV Store
  await saveToKV(section, validData);

  // 4. Await GitHub commit in serverless environment to prevent Lambda freezing
  const ghResult = await commitToGitHub(section, validData);

  // 5. Invalidate Next.js cache paths dynamically
  try {
    const nextCache = await import("next/cache");
    if (nextCache && typeof nextCache.revalidatePath === "function") {
      nextCache.revalidatePath("/", "layout");
      nextCache.revalidatePath("/");
      nextCache.revalidatePath("/capabilities");
      nextCache.revalidatePath("/process");
      nextCache.revalidatePath("/materials");
      nextCache.revalidatePath("/company");
      nextCache.revalidatePath("/contact");
    }
  } catch {
    // Ignore outside Next.js request context
  }

  let msg = `Section '${section}' successfully updated and published live.`;
  if (ghResult.success) {
    msg += ` (Committed to GitHub repository)`;
  } else if (ghResult.error && !ghResult.error.includes("GITHUB_TOKEN is not set")) {
    msg += ` [Note: GitHub sync returned: ${ghResult.error}]`;
  }

  return {
    success: true,
    message: msg,
    data: validData,
  };
}
