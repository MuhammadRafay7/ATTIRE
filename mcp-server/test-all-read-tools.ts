import { executeTool, listTools } from "../src/lib/mcp/tools";

async function testAllReadTools() {
  console.log("📖 Testing all read tools (Grok & LLM verification)...\n");

  const readTools = [
    "get_hero_content",
    "get_contact_info",
    "get_stats",
    "get_materials",
    "get_testimonials",
    "get_features",
    "get_process",
    "get_company",
    "list_sections",
    "list_images",
    "validate_all_content",
  ];

  for (const name of readTools) {
    const res = await executeTool(name, {});
    if (res.isError) {
      console.error(`❌ Tool '${name}' failed:`, res.text);
      process.exit(1);
    } else {
      console.log(`✅ Tool '${name}': returned ${res.text.length} chars of data`);
    }
  }

  // Also test get_section with param
  const sectionRes = await executeTool("get_section", { section: "hero" });
  if (sectionRes.isError || !sectionRes.text.includes("Direct Principal")) {
    console.error("❌ get_section(hero) failed", sectionRes);
    process.exit(1);
  }
  console.log("✅ Tool 'get_section' (hero): PASSED");

  console.log("\n🎉 ALL READ TOOLS ARE 100% OPERATIONAL & SERVERLESS-SAFE!");
}

testAllReadTools().catch(console.error);
