import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";

const EXPECTED_KEY = process.env.ATTIRE_MCP_KEY || "rafay";

export const MCP_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, mcp-session-id, mcp-protocol-version, x-client-id, x-api-key, accept",
  "Access-Control-Expose-Headers": "WWW-Authenticate, mcp-session-id",
  "Access-Control-Max-Age": "86400",
};

// In-memory code store for short-lived authorization codes (10 minutes)
interface AuthCodeEntry {
  code: string;
  clientId: string;
  redirectUri: string;
  codeChallenge?: string;
  codeChallengeMethod?: string;
  expiresAt: number;
}

const authCodes = new Map<string, AuthCodeEntry>();

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
  const codeChallenge = params.get("code_challenge") || undefined;
  const codeChallengeMethod = params.get("code_challenge_method") || "S256";
  const clientId = params.get("client_id") || "claude";

  if (!redirectUri) {
    return NextResponse.json(
      { error: "invalid_request", error_description: "Missing redirect_uri" },
      { status: 400, headers: MCP_CORS_HEADERS }
    );
  }

  // Generate single-use authorization code
  const code = "attire_code_" + crypto.randomBytes(24).toString("hex");
  authCodes.set(code, {
    code,
    clientId,
    redirectUri,
    codeChallenge,
    codeChallengeMethod,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  // Redirect back to client callback with code & state
  const target = new URL(redirectUri);
  target.searchParams.set("code", code);
  if (state) target.searchParams.set("state", state);

  return NextResponse.redirect(target.toString(), {
    headers: MCP_CORS_HEADERS,
  });
}

export async function handleToken(req: NextRequest) {
  let grantType = "";
  let code = "";
  let codeVerifier = "";
  let clientId = "";
  let clientSecret = "";

  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
    const formData = await req.formData().catch(() => null);
    if (formData) {
      grantType = (formData.get("grant_type") || "").toString();
      code = (formData.get("code") || "").toString();
      codeVerifier = (formData.get("code_verifier") || "").toString();
      clientId = (formData.get("client_id") || "").toString();
      clientSecret = (formData.get("client_secret") || "").toString();
    }
  } else {
    const json = await req.json().catch(() => null);
    if (json) {
      grantType = json.grant_type || "";
      code = json.code || "";
      codeVerifier = json.code_verifier || "";
      clientId = json.client_id || "";
      clientSecret = json.client_secret || "";
    }
  }

  // Check client_credentials grant
  if (grantType === "client_credentials") {
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
    const stored = authCodes.get(code);
    if (!stored || stored.expiresAt < Date.now()) {
      // Fallback: grant token if code starts with attire_code_
      if (code.startsWith("attire_code_")) {
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
        { error: "invalid_grant", error_description: "Invalid or expired authorization code" },
        { status: 400, headers: MCP_CORS_HEADERS }
      );
    }

    authCodes.delete(code);

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

  // Default fallback: return token
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
