# Attire Services — Occuin-Style Next.js Route MCP Server & CMS

An integrated, production-ready **Model Context Protocol (MCP)** endpoint built directly into the Next.js application at `/api/mcp` (mirroring the Occuin architecture).

This allows any AI agent or LLM client (Claude Desktop, Cursor, Antigravity, ChatGPT, OpenCode, Cline, Windsurf) to connect directly via HTTP URL with Bearer token authentication, or via standard stdio, to manage all site content without a database.

---

## ⚡ Quick Connection (HTTP Mode — Recommended)

When your Next.js app is running (`npm run dev` or production), the MCP server is live at `/api/mcp`.

### 1. Claude Desktop / Cursor / Antigravity / Any Agent Client
Add to your MCP configuration (`claude_desktop_config.json`, `.cursor/mcp.json`, or `.agents/mcp_config.json`):

```json
{
  "mcpServers": {
    "attire-services": {
      "url": "http://localhost:3000/api/mcp",
      "headers": {
        "Authorization": "Bearer rafay"
      }
    }
  }
}
```

> **In Production**: Replace `http://localhost:3000/api/mcp` with your live domain (e.g. `https://attireservices.com/api/mcp`).

---

## 🔌 Stdio Mode (Command-line)

If an agent requires standard input/output transport:

```json
{
  "mcpServers": {
    "attire-services": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "/home/personal/Programing/attire-services/mcp-server/index.ts"
      ],
      "env": {
        "ATTIRE_MCP_KEY": "rafay"
      }
    }
  }
}
```

---

## 🔒 Security & Authentication

1. **Secret Key**: Configured in `.env.local` as `ATTIRE_MCP_KEY=rafay`.
2. **Bearer Token Authentication**:
   - Every request to `/api/mcp` requires `Authorization: Bearer <key>` or `x-api-key: <key>`.
   - Unauthorized requests return HTTP `401 Unauthorized` with `WWW-Authenticate: Bearer realm="attire-mcp"`, prompting the LLM client for credentials.
   - Invalid keys return HTTP `403 Forbidden`.

---

## 🛠️ Available MCP Tools

| Tool Name | Type | Description |
| :--- | :--- | :--- |
| `list_sections` | Read | List all editable site content sections and file details. |
| `get_section` | Read | Retrieve JSON content for any section (`general`, `hero`, `stats`, `features`, `process`, `materials`, `company`, `testimonials`, or `"all"`). |
| `update_section` | Write | Update complete section JSON with Zod schema validation and automatic backup. |
| `update_hero` | Write | Update headline, highlighted text, lede, buttons, and guarantee tags. |
| `update_contact_info`| Write | Update email, phone, hours, and office desk addresses. |
| `update_stats` | Write | Update key stats (years, mills, TEU volume, clearance rate). |
| `add_or_update_material` | Write | Add a new fabric or update an existing fabric spec in the catalog. |
| `delete_material` | Write | Remove a fabric item by ID. |
| `add_or_update_testimonial` | Write | Add or update client reviews. |
| `list_images` | Read | List all images available in `public/images/`. |
| `list_backups` | Read | View automatic timestamped rollback backups in `.content-backups/`. |
| `restore_backup` | Write | Revert a section to an earlier backup version. |
| `validate_all_content`| Read | Run full schema verification on all site content JSON files. |

---

## 📂 Content Files Managed

```
src/content/
  ├── general.json       # Branding, contact, offices, nav, footers, legal lines
  ├── hero.json          # Main hero headline, interactive showcase stations, badges
  ├── stats.json         # Business numbers & metrics
  ├── features.json      # Sourcing capabilities & laboratory testing matrix
  ├── process.json       # 4-stage protocol & risk mitigation cards
  ├── materials.json     # Full fabric catalog, fiber standards, weight conversions
  ├── company.json       # Trading house story, charter rules, factory visits
  └── testimonials.json  # Buyer quotes and measurable outcomes
```
