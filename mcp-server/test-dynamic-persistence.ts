import { executeTool } from "../src/lib/mcp/tools";
import { getHeroContentAsync, getStatsContentAsync } from "../src/lib/server-content";

async function main() {
  console.log("🧪 Testing Hybrid Serverless Content Persistence & Live Sync...");

  // 1. Read initial hero content
  const initialHero = await getHeroContentAsync();
  console.log("1. Initial Hero Lead:", initialHero.title.lead);

  // 2. Call MCP update_hero tool
  const updateRes = await executeTool("update_hero", {
    headlineLead: "Direct Principal Apparel Trading (Verified Live)",
    lede: "Customized live update via MCP serverless storage engine without rebuilding the site.",
  });
  console.log("2. update_hero response:", updateRes.text);

  // 3. Verify that getHeroContentAsync returns the updated value
  const updatedHero = await getHeroContentAsync();
  console.log("3. Fetched Updated Hero Lead:", updatedHero.title.lead);

  if (updatedHero.title.lead !== "Direct Principal Apparel Trading (Verified Live)") {
    throw new Error("Failed: Hero lead was not updated in storage!");
  }

  // 4. Test stats update
  const statsRes = await executeTool("update_stats", {
    stats: [
      {
        value: "16",
        unit: "Years",
        label: "Continuous apparel export operations",
        detail: "Active merchant balance sheet since 2009",
      },
      {
        value: "65+",
        unit: "Audited Mills",
        label: "Direct mill agreements",
        detail: "Zero spot-market intermediary agents",
      },
      {
        value: "99.8%",
        unit: "Pass Rate",
        label: "First-time destination port clearance",
        detail: "Zero container rejections in 15 years",
      },
      {
        value: "48h",
        unit: "Max SLA",
        label: "RFQ to landed cost turn-around",
        detail: "Direct pricing from spinning floor",
      },
    ],
  });
  console.log("4. update_stats response:", statsRes.text);

  const updatedStats = await getStatsContentAsync();
  console.log("5. Updated stats count:", updatedStats.length);
  console.log("6. Updated mill count:", updatedStats[1].value);

  // 5. Restore hero to original
  await executeTool("update_hero", {
    headlineLead: initialHero.title.lead,
    lede: initialHero.lede,
  });
  console.log("7. Hero restored to original cleanly.");

  console.log("✅ All Hybrid Persistence tests passed successfully!");
}

main().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
