import { authenticateMcpRequest } from "../src/lib/mcp/auth";
import { handleRpc, isJsonRpcRequest } from "../src/lib/mcp/protocol";

async function runTests() {
  console.log("🧪 Testing Occuin-style Next.js Route MCP Handler & Auth...\n");

  // Test 1: Unauthenticated request
  const unauthHeaders = new Headers();
  const unauthResult = authenticateMcpRequest(unauthHeaders);
  if (!unauthResult.authenticated && unauthResult.status === 401) {
    console.log("✅ Test 1: Unauthenticated request correctly rejected with status 401");
  } else {
    console.error("❌ Test 1 failed", unauthResult);
    process.exit(1);
  }

  // Test 2: Invalid Bearer key
  const invalidHeaders = new Headers({ Authorization: "Bearer wrong-key" });
  const invalidResult = authenticateMcpRequest(invalidHeaders);
  if (!invalidResult.authenticated && invalidResult.status === 403) {
    console.log("✅ Test 2: Invalid bearer key correctly rejected with status 403");
  } else {
    console.error("❌ Test 2 failed", invalidResult);
    process.exit(1);
  }

  // Test 3: Valid Bearer key
  const validHeaders = new Headers({ Authorization: "Bearer rafay" });
  const validResult = authenticateMcpRequest(validHeaders);
  if (validResult.authenticated) {
    console.log("✅ Test 3: Valid bearer key successfully authenticated");
  } else {
    console.error("❌ Test 3 failed", validResult);
    process.exit(1);
  }

  // Test 4: JSON-RPC Initialize
  const initRequest = { jsonrpc: "2.0" as const, id: 1, method: "initialize", params: {} };
  const initRes = await handleRpc(initRequest);
  console.log("✅ Test 4: Initialize response:", (initRes?.result as any)?.serverInfo?.name);

  // Test 5: JSON-RPC Tools List
  const listRequest = { jsonrpc: "2.0" as const, id: 2, method: "tools/list", params: {} };
  const listRes = await handleRpc(listRequest);
  const toolCount = (listRes?.result as any)?.tools?.length || 0;
  console.log(`✅ Test 5: Listed ${toolCount} available MCP tools`);

  // Test 6: Call get_section
  const callRequest = {
    jsonrpc: "2.0" as const,
    id: 3,
    method: "tools/call",
    params: {
      name: "get_section",
      arguments: { section: "stats" },
    },
  };
  const callRes = await handleRpc(callRequest);
  const outputText = (callRes?.result as any)?.content?.[0]?.text;
  if (outputText && outputText.includes("17")) {
    console.log("✅ Test 6: Tool 'get_section' retrieved stats correctly");
  } else {
    console.error("❌ Test 6 failed", callRes);
    process.exit(1);
  }

  console.log("\n🎉 ALL OCCUIN-STYLE HTTP MCP TESTS PASSED SUCCESSFULLY!");
}

runTests().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
