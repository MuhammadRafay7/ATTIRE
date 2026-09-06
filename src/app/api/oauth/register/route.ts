import { NextRequest } from "next/server";
import { handleRegister, handleOptions } from "@/lib/mcp/oauth";

export const dynamic = "force-dynamic";

export const POST = (req: NextRequest) => handleRegister(req);
export const OPTIONS = () => handleOptions();
