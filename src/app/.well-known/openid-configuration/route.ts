import { NextRequest, NextResponse } from "next/server";
import { authorizationServerMetadata, MCP_CORS_HEADERS, handleOptions } from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return NextResponse.json(authorizationServerMetadata(req.nextUrl.origin), {
    headers: { "Cache-Control": "public, max-age=3600", ...MCP_CORS_HEADERS },
  });
}

export const OPTIONS = () => handleOptions();
