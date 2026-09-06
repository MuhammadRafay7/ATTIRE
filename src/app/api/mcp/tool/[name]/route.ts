import { NextRequest, NextResponse } from "next/server";
import { authenticateMcpRequest } from "@/lib/mcp/auth";
import { executeTool } from "@/lib/mcp/tools";
import { MCP_CORS_HEADERS, handleOptions } from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  const auth = authenticateMcpRequest(req.headers);
  if (!auth.authenticated) {
    return NextResponse.json(
      { error: auth.error || "Unauthorized" },
      {
        status: auth.status || 401,
        headers: {
          "WWW-Authenticate": 'Bearer realm="attire-mcp"',
          ...MCP_CORS_HEADERS,
        },
      }
    );
  }

  const { name } = await context.params;
  const body = await req.json().catch(() => ({}));
  const result = await executeTool(name, body);

  return NextResponse.json(result, {
    status: result.isError ? 400 : 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...MCP_CORS_HEADERS,
    },
  });
}

export const OPTIONS = () => handleOptions();
