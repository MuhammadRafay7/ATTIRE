import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { MCP_CORS_HEADERS } from "@/lib/mcp/oauth";

const EXPECTED_KEY = process.env.ATTIRE_MCP_KEY || "rafay";

// Shared in-memory auth codes store
export interface AuthCodeEntry {
  code: string;
  clientId: string;
  redirectUri: string;
  codeChallenge?: string;
  codeChallengeMethod?: string;
  expiresAt: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __mcpAuthCodes: Map<string, AuthCodeEntry> | undefined;
}

if (!global.__mcpAuthCodes) {
  global.__mcpAuthCodes = new Map<string, AuthCodeEntry>();
}

export const authCodesMap = global.__mcpAuthCodes;

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { password, redirect_uri, state, code_challenge, code_challenge_method, client_id } = body;

  if (!password || password !== EXPECTED_KEY) {
    return NextResponse.json(
      { error: "Invalid password. Access denied." },
      { status: 401, headers: MCP_CORS_HEADERS }
    );
  }

  if (!redirect_uri) {
    return NextResponse.json(
      { error: "Missing redirect_uri in authorization request." },
      { status: 400, headers: MCP_CORS_HEADERS }
    );
  }

  // Issue single-use code valid for 10 minutes
  const code = "attire_code_" + crypto.randomBytes(24).toString("hex");
  authCodesMap.set(code, {
    code,
    clientId: client_id || "claude",
    redirectUri: redirect_uri,
    codeChallenge: code_challenge,
    codeChallengeMethod: code_challenge_method,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  const target = new URL(redirect_uri);
  target.searchParams.set("code", code);
  if (state) target.searchParams.set("state", state);

  return NextResponse.json(
    { success: true, redirectUrl: target.toString() },
    { headers: MCP_CORS_HEADERS }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: MCP_CORS_HEADERS });
}
