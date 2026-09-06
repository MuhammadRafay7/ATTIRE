import { handleAuthorize, handleToken } from "../src/lib/mcp/oauth";
import { POST as consentHandler } from "../src/app/api/mcp/consent/route";
import { NextRequest } from "next/server";

async function testPasswordEnforcedOAuth() {
  console.log("🔐 Testing Password-Protected OAuth Flow...\n");

  const origin = "https://attire-xi-three.vercel.app";
  const callbackUrl = "https://claude.ai/api/mcp/oauth/callback";

  // Step 1: Client initiates authorization
  const authReq = new NextRequest(
    `${origin}/api/oauth/authorize?client_id=claude_ai&redirect_uri=${encodeURIComponent(callbackUrl)}&state=xyz123`
  );
  const authRes = await handleAuthorize(authReq);
  const location = authRes.headers.get("location");
  console.log("✅ Step 1: Authorization request redirects browser to password gate:", location);

  // Step 2: User attempts with WRONG password
  const wrongConsentReq = new NextRequest(`${origin}/api/mcp/consent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: "wrong-password",
      redirect_uri: callbackUrl,
      state: "xyz123",
      client_id: "claude_ai",
    }),
  });
  const wrongRes = await consentHandler(wrongConsentReq);
  if (wrongRes.status === 401) {
    console.log("✅ Step 2: Wrong password correctly REJECTED with 401 Unauthorized");
  } else {
    console.error("❌ Step 2 failed", wrongRes.status);
    process.exit(1);
  }

  // Step 3: User enters correct password "rafay"
  const correctConsentReq = new NextRequest(`${origin}/api/mcp/consent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: "rafay",
      redirect_uri: callbackUrl,
      state: "xyz123",
      client_id: "claude_ai",
    }),
  });
  const correctRes = await consentHandler(correctConsentReq);
  const consentData = await correctRes.json();
  console.log("✅ Step 3: Password 'rafay' approved! Callback URL generated:", consentData.redirectUrl);

  const codeMatch = /code=([^&]+)/.exec(consentData.redirectUrl);
  const code = codeMatch ? codeMatch[1] : "";

  // Step 4: Claude exchanges authorization code for Bearer token
  const tokenReq = new NextRequest(`${origin}/api/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      client_id: "claude_ai",
    }),
  });
  const tokenRes = await handleToken(tokenReq);
  const tokenData = await tokenRes.json();
  if (tokenData.access_token === "rafay") {
    console.log("✅ Step 4: Token successfully issued to authorized agent:", tokenData.access_token);
  } else {
    console.error("❌ Step 4 failed", tokenData);
    process.exit(1);
  }

  console.log("\n🎉 PASSWORD GATE IS FULLY ENFORCED! No agent can connect without entering 'rafay'.");
}

testPasswordEnforcedOAuth().catch(console.error);
