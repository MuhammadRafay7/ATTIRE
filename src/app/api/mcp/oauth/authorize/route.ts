import { NextRequest } from "next/server";
import { handleAuthorize, handleOptions } from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

export const GET = (req: NextRequest) => handleAuthorize(req);
export const POST = (req: NextRequest) => handleAuthorize(req);
export const OPTIONS = () => handleOptions();
