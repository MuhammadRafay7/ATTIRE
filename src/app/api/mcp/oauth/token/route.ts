import { NextRequest } from "next/server";
import { handleToken, handleOptions } from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

export const GET = (req: NextRequest) => handleToken(req);
export const POST = (req: NextRequest) => handleToken(req);
export const OPTIONS = () => handleOptions();
