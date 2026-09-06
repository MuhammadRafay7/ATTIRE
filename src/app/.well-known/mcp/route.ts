import { NextRequest, NextResponse } from "next/server";
import { MCP_CORS_HEADERS, handleOptions } from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  return NextResponse.json(
    {
      mcp_servers: [
        {
          name: "attire-services-cms",
          url: `${origin}/api/mcp`,
          transport: "http",
        },
      ],
    },
    {
      headers: { "Cache-Control": "public, max-age=3600", ...MCP_CORS_HEADERS },
    }
  );
}

export const OPTIONS = () => handleOptions();
