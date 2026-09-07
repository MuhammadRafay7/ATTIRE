import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

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

const EXPECTED_KEY = process.env.ATTIRE_MCP_KEY || "rafay";

export const MCP_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, mcp-session-id, mcp-protocol-version, x-client-id, x-api-key, accept",
  "Access-Control-Expose-Headers": "WWW-Authenticate, mcp-session-id",
  "Access-Control-Max-Age": "86400",
};

export function authorizationServerMetadata(origin: string) {
  return {
    issuer: origin,
    authorization_endpoint: `${origin}/api/oauth/authorize`,
    token_endpoint: `${origin}/api/oauth/token`,
    registration_endpoint: `${origin}/api/oauth/register`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "client_credentials"],
    token_endpoint_auth_methods_supported: ["none", "client_secret_post", "client_secret_basic"],
    code_challenge_methods_supported: ["S256", "plain"],
    scopes_supported: ["mcp"],
  };
}

export function protectedResourceMetadata(origin: string) {
  return {
    resource: `${origin}/api/mcp`,
    authorization_servers: [origin],
    scopes_supported: ["mcp"],
    bearer_methods_supported: ["header"],
  };
}

export function handleOptions() {
  return new NextResponse(null, { status: 204, headers: MCP_CORS_HEADERS });
}

export async function handleAuthorize(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const redirectUri = params.get("redirect_uri") || "";
  const state = params.get("state") || "";
  const codeChallenge = params.get("code_challenge") || "";
  const codeChallengeMethod = params.get("code_challenge_method") || "S256";
  const clientId = params.get("client_id") || "Claude / AI Agent";

  if (!redirectUri) {
    return NextResponse.json(
      { error: "invalid_request", error_description: "Missing redirect_uri" },
      { status: 400, headers: MCP_CORS_HEADERS }
    );
  }

  // Redirect to the password authorization consent screen
  const authorizeUrl = new URL("/mcp/authorize", req.nextUrl.origin);
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  if (state) authorizeUrl.searchParams.set("state", state);
  if (codeChallenge) authorizeUrl.searchParams.set("code_challenge", codeChallenge);
  if (codeChallengeMethod) authorizeUrl.searchParams.set("code_challenge_method", codeChallengeMethod);

  return NextResponse.redirect(authorizeUrl.toString(), {
    headers: MCP_CORS_HEADERS,
  });
}

export async function handleToken(req: NextRequest) {
  let grantType = "";
  let code = "";
  let clientSecret = "";

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const formData = await req.formData().catch(() => null);
    if (formData) {
      grantType = (formData.get("grant_type") || "").toString();
      code = (formData.get("code") || "").toString();
      clientSecret = (formData.get("client_secret") || "").toString();
    }
  } else {
    const json = await req.json().catch(() => null);
    if (json) {
      grantType = json.grant_type || "";
      code = json.code || "";
      clientSecret = json.client_secret || "";
    }
  }

  // Check client_credentials grant (must match password rafay)
  if (grantType === "client_credentials") {
    if (clientSecret && clientSecret !== EXPECTED_KEY) {
      return NextResponse.json(
        { error: "invalid_client", error_description: "Invalid client_secret password" },
        { status: 401, headers: MCP_CORS_HEADERS }
      );
    }
    return NextResponse.json(
      {
        access_token: EXPECTED_KEY,
        token_type: "Bearer",
        expires_in: 86400 * 365,
        scope: "mcp",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          ...MCP_CORS_HEADERS,
        },
      }
    );
  }

  // Check authorization_code grant
  if (grantType === "authorization_code" || code) {
    const stored = authCodesMap?.get(code);
    if (!stored || stored.expiresAt < Date.now()) {
      return NextResponse.json(
        { error: "invalid_grant", error_description: "Invalid or expired authorization code. Authorization required." },
        { status: 400, headers: MCP_CORS_HEADERS }
      );
    }

    authCodesMap?.delete(code);

    return NextResponse.json(
      {
        access_token: EXPECTED_KEY,
        token_type: "Bearer",
        expires_in: 86400 * 365,
        scope: "mcp",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          ...MCP_CORS_HEADERS,
        },
      }
    );
  }

  return NextResponse.json(
    { error: "unsupported_grant_type", error_description: "Unsupported grant type" },
    { status: 400, headers: MCP_CORS_HEADERS }
  );
}

export async function handleRegister(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const clientId = "attire_client_" + crypto.randomBytes(8).toString("hex");
  const clientSecret = "attire_sec_" + crypto.randomBytes(16).toString("hex");

  return NextResponse.json(
    {
      client_id: clientId,
      client_secret: clientSecret,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      client_secret_expires_at: 0,
      redirect_uris: body.redirect_uris || [],
      grant_types: ["authorization_code", "client_credentials"],
      response_types: ["code"],
      scope: "mcp",
    },
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        ...MCP_CORS_HEADERS,
      },
    }
  );
}
