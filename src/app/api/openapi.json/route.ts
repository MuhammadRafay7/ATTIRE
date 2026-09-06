import { NextRequest, NextResponse } from "next/server";
import { listTools } from "@/lib/mcp/tools";
import { MCP_CORS_HEADERS } from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin;
  const tools = listTools();

  const paths: Record<string, unknown> = {};

  for (const tool of tools) {
    paths[`/api/mcp/tool/${tool.name}`] = {
      post: {
        summary: tool.description,
        operationId: tool.name,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: tool.inputSchema,
            },
          },
        },
        responses: {
          "200": {
            description: "Successful tool execution",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    text: { type: "string" },
                    isError: { type: "boolean" },
                  },
                },
              },
            },
          },
        },
      },
    };
  }

  const spec = {
    openapi: "3.1.0",
    info: {
      title: "Attire Services CMS API",
      version: "1.0.0",
      description: "Manage site copy, hero, catalog, contact info, and testimonials for Attire Services without a database.",
    },
    servers: [{ url: origin }],
    security: [{ BearerAuth: [] }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths,
  };

  return NextResponse.json(spec, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
      ...MCP_CORS_HEADERS,
    },
  });
}
