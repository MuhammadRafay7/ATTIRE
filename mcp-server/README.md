# Attire Services — Universal AI Agent & LLM Integration (MCP + OAuth + OpenAPI)

A universal, production-grade interface enabling **ANY** AI agent or LLM (Claude, ChatGPT / OpenAI, Cursor, Google Gemini, Antigravity, Grok, DeepSeek, Cline, Windsurf, LangChain) to manage all site content without a database.

---

## 🌐 Compatibility Matrix Across All LLMs

| AI Platform / Client | Protocol | Connection Method |
| :--- | :--- | :--- |
| **Claude (Claude.ai Web & Desktop)** | MCP + OAuth 2.1 | URL: `https://attire-xi-three.vercel.app` *(1-click Auto-Discovery)* |
| **ChatGPT / OpenAI (GPT Actions)** | OpenAPI 3.1 REST | Import URL: `https://attire-xi-three.vercel.app/api/openapi.json` |
| **Cursor / Windsurf / Cline / Roo** | MCP (HTTP / SSE) | URL: `https://attire-xi-three.vercel.app/api/mcp` + Header `Authorization: Bearer rafay` |
| **Antigravity / Gemini IDE** | MCP (HTTP or Stdio) | MCP Config URL or `npx tsx mcp-server/index.ts` |
| **LangChain / AutoGen / CrewAI** | OpenAPI / JSON-RPC | REST tools at `/api/mcp/tool/{name}` or JSON-RPC at `/api/mcp` |

---

## ⚡ How to Connect Each Platform

### 1. Claude.ai (Custom Connectors)
- **URL**: `https://attire-xi-three.vercel.app`
- **Method**: 1-click Auto-Discovery (Uses RFC 8414 & RFC 7591 behind the scenes).

### 2. ChatGPT (Custom GPT / Actions)
- In the GPT Action builder:
- **Import from URL**: `https://attire-xi-three.vercel.app/api/openapi.json`
- **Authentication**: Bearer Token → `rafay`

### 3. Cursor / Windsurf / Cline / Antigravity
In your `mcp.json` or MCP settings:

```json
{
  "mcpServers": {
    "attire-services": {
      "url": "https://attire-xi-three.vercel.app/api/mcp",
      "headers": {
        "Authorization": "Bearer rafay"
      }
    }
  }
}
```

---

## 🔒 Security

All protocols require authentication with the secret password **`rafay`**:
- In MCP: Sent via `Authorization: Bearer rafay` or `x-api-key: rafay`.
- In OAuth: Exchanged automatically for the authenticated access token.
- In OpenAPI REST: Sent via HTTP `Authorization: Bearer rafay`.
