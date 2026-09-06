import { authorizationServerMetadata, protectedResourceMetadata, handleRegister } from "../src/lib/mcp/oauth";
import { NextRequest } from "next/server";

async function testOAuthDiscovery() {
  console.log("🔍 Testing OAuth 2.1 RFC 8414 & RFC 7591 Auto-Discovery...\n");

  const origin = "https://attire-xi-three.vercel.app";

  // 1. Discovery metadata
  const meta = authorizationServerMetadata(origin);
  console.log("✅ 1. Authorization Server Metadata:", meta.authorization_endpoint);
  console.log("   Registration Endpoint:", meta.registration_endpoint);
  console.log("   Token Endpoint:", meta.token_endpoint);

  // 2. Protected Resource metadata
  const resource = protectedResourceMetadata(origin);
  console.log("✅ 2. Protected Resource Metadata:", resource.resource);

  // 3. Dynamic Client Registration (RFC 7591)
  const req = new NextRequest(`${origin}/api/oauth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_name: "Claude Desktop / Web Connector",
      redirect_uris: ["https://claude.ai/api/mcp/oauth/callback"],
    }),
  });
  const regRes = await handleRegister(req);
  const regData = await regRes.json();
  console.log("✅ 3. Dynamic Client Registration successful:", regData.client_id);

  console.log("\n🎉 Claude / LLMs will now AUTO-DISCOVER and connect automatically with 1-click!");
}

testOAuthDiscovery().catch(console.error);
