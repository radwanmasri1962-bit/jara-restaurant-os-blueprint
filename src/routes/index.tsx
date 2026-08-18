import { createFileRoute } from "@tanstack/react-router";
import { BlueprintNav } from "@/components/blueprint/nav";
import { Hero, S1ExecutiveSummary, S2Problem, S3Opportunity, S4ProductVision } from "@/components/blueprint/part1";
import { S5Journey, S6Architecture, S7Features, S8Menu } from "@/components/blueprint/part2";
import { S9Locations, S10Voice, S11ManagerDashboard, S12Corporate } from "@/components/blueprint/part3";
import { S13Financial, S14BusinessModel, S15Competition, S16Roadmap } from "@/components/blueprint/part4";
import { S17Risks, S18Implementation, S19Investment, S20Conclusion } from "@/components/blueprint/part5";

const title = "JARA RestaurantOS — Strategic Blueprint";
const description =
  "Internal executive blueprint for JARA RestaurantOS: architecture, menu engine, voice ordering, financial model, roadmap, risks, and investment plan.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <BlueprintNav />
      <main className="pt-14">
        <Hero />
        <S1ExecutiveSummary />
        <S2Problem />
        <S3Opportunity />
        <S4ProductVision />
        <S5Journey />
        <S6Architecture />
        <S7Features />
        <S8Menu />
        <S9Locations />
        <S10Voice />
        <S11ManagerDashboard />
        <S12Corporate />
        <S13Financial />
        <S14BusinessModel />
        <S15Competition />
        <S16Roadmap />
        <S17Risks />
        <S18Implementation />
        <S19Investment />
        <S20Conclusion />
      </main>
    </div>
  );
}
