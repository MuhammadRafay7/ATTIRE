import { NextRequest } from "next/server";

export interface McpAuthResult {
  authenticated: boolean;
  error?: string;
  status?: 401 | 403;
}

const EXPECTED_KEY = process.env.ATTIRE_MCP_KEY || "rafay";

export function bearerFromHeaders(headers: Headers): string | null {
  const raw = headers.get("authorization") ?? headers.get("Authorization");
  if (raw) {
    const match = /^Bearer\s+(.+)$/i.exec(raw.trim());
    if (match) return match[1];
  }
  const apiKey = headers.get("x-api-key") ?? headers.get("X-Api-Key");
  if (apiKey) return apiKey.trim();
  return null;
}

export function authenticateMcpRequest(headers: Headers): McpAuthResult {
  const token = bearerFromHeaders(headers);
  if (!token) {
    return {
      authenticated: false,
      error: "Authorization required. Provide 'Authorization: Bearer <ATTIRE_MCP_KEY>' or 'x-api-key' header.",
      status: 401,
    };
  }

  if (token !== EXPECTED_KEY) {
    return {
      authenticated: false,
      error: "Invalid authentication token/password.",
      status: 403,
    };
  }

  return { authenticated: true };
}
