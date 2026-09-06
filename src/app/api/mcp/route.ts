import { NextRequest, NextResponse } from "next/server";
import { authenticateMcpRequest } from "@/lib/mcp/auth";
import {
  JSON_RPC_ERRORS,
  handleRpc,
  isJsonRpcRequest,
  rpcError,
  type JsonRpcResponse,
} from "@/lib/mcp/protocol";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_BATCH = 20;

function unauthorized(message: string, status: 401 | 403) {
  const wwwAuth =
    status === 401
      ? 'Bearer realm="attire-mcp", description="Provide ATTIRE_MCP_KEY in Authorization header or x-api-key"'
      : undefined;

  return NextResponse.json(
    {
      jsonrpc: "2.0",
      id: null,
      error: { code: JSON_RPC_ERRORS.INVALID_REQUEST, message },
    },
    {
      status,
      headers: {
        ...(wwwAuth ? { "WWW-Authenticate": wwwAuth } : {}),
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, mcp-session-id, x-client-id, x-api-key, accept",
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, mcp-session-id, x-client-id, x-api-key, accept",
    },
  });
}

export async function GET() {
  return NextResponse.json(
    {
      name: "attire-services-cms",
      version: "1.0.0",
      description: "Attire Services MCP HTTP Endpoint",
      auth: "Bearer Token (ATTIRE_MCP_KEY)",
      endpoint: "/api/mcp",
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export async function POST(request: NextRequest) {
  const auth = authenticateMcpRequest(request.headers);
  if (!auth.authenticated) {
    return unauthorized(auth.error || "Unauthorized", auth.status || 401);
  }

  const body = await request.json().catch(() => null);
  if (body === null) {
    return NextResponse.json(rpcError(null, JSON_RPC_ERRORS.PARSE_ERROR, "Invalid JSON body."), {
      status: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  const messages = Array.isArray(body) ? body : [body];
  if (messages.length === 0 || messages.length > MAX_BATCH) {
    return NextResponse.json(
      rpcError(null, JSON_RPC_ERRORS.INVALID_REQUEST, `Send between 1 and ${MAX_BATCH} messages.`),
      { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  const responses: JsonRpcResponse[] = [];
  for (const message of messages) {
    if (!isJsonRpcRequest(message)) {
      responses.push(
        rpcError(null, JSON_RPC_ERRORS.INVALID_REQUEST, "Not a JSON-RPC 2.0 request object.")
      );
      continue;
    }
    try {
      const response = await handleRpc(message);
      if (response) responses.push(response);
    } catch (error) {
      console.error(`[mcp] ${message.method} failed:`, error);
      responses.push(
        rpcError(
          message.id ?? null,
          JSON_RPC_ERRORS.INTERNAL_ERROR,
          error instanceof Error ? error.message : "Internal error."
        )
      );
    }
  }

  if (responses.length === 0) {
    return new NextResponse(null, {
      status: 202,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }

  const payload = Array.isArray(body) ? responses : responses[0];
  return NextResponse.json(payload, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
