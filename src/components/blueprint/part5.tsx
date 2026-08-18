import { Section, Panel, Bullets, DataTable, DataTag, Note, Stat, Kicker, Reveal } from "./primitives";
import { ChartFrame, axisProps, tooltipProps } from "./chart-frame";
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from "recharts";

type Risk = { area: string; risk: string; impact: "High" | "Medium" | "Low"; likelihood: "High" | "Medium" | "Low"; mitigation: string };

const risks: Risk[] = [
  { area: "Business", risk: "Restaurants will not pay a monthly subscription without proven ROI", impact: "High", likelihood: "Medium", mitigation: "Baseline every pilot store before go-live so value is measured, not asserted" },
  { area: "Business", risk: "Sales cycle longer than cash runway assumes", impact: "High", likelihood: "Medium", mitigation: "Lead with the low-commitment Voice tier; keep onboarding cost per store low" },
  { area: "Operational", risk: "Menu configuration is slower and more manual than expected", impact: "High", likelihood: "High", mitigation: "Invest early in import tooling and POS menu sync; treat menu build as a product, not a service" },
  { area: "Operational", risk: "Support load scales linearly with store count", impact: "Medium", likelihood: "High", mitigation: "Self-serve manager tooling, in-product diagnostics, and clear escalation tiers" },
  { area: "Technology", risk: "Voice accuracy insufficient in noisy or accented conditions", impact: "High", likelihood: "Medium", mitigation: "Confidence thresholds with confirmation and human transfer; menu-specific vocabulary" },
  { area: "Technology", risk: "POS integration limits or API changes break order injection", impact: "High", likelihood: "Medium", mitigation: "Abstraction layer over POS, queued retries, printer fallback path, monitoring and alerting" },
  { area: "Technology", risk: "Unit economics broken by per-call model costs", impact: "High", likelihood: "Medium", mitigation: "Measure cost per completed order in pilot; meter voice if needed before scaling" },
  { area: "Sales", risk: "Incumbents bundle a comparable voice feature", impact: "Medium", likelihood: "Medium", mitigation: "Compete on unified menu and cross-channel data, not on voice alone" },
  { area: "Execution", risk: "Scope expands beyond the team's delivery capacity", impact: "High", likelihood: "High", mitigation: "Phase gates with explicit exit criteria; nothing starts before the prior phase is live" },
  { area: "Compliance", risk: "Payment, call recording, and privacy obligations", impact: "Medium", likelihood: "Medium", mitigation: "Use a compliant processor, disclose recording, formalize data ownership in contract" },
];

const sev = { High: "text-destructive", Medium: "text-illustrative", Low: "text-verified" } as const;

export function S17Risks() {
  return (
    <Section
      id="risks"
      index={17}
      kicker="Risks"
      title="The risks that would actually stop this."
      lede="Listed by category with impact, likelihood, and a specific mitigation. Risks without a concrete mitigation are decision points, not risks — they appear in Section 18."
    >
      <DataTable
        dense
        head={["Area", "Risk", "Impact", "Likelihood", "Mitigation"]}
        rows={risks.map((r) => [
          r.area,
          r.risk,
          <span key="i" className={sev[r.impact]}>{r.impact}</span>,
          <span key="l" className={sev[r.likelihood]}>{r.likelihood}</span>,
          r.mitigation,
        ])}
      />
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <Panel eyebrow="Top risk" title="Menu configuration cost">
          <p className="text-sm leading-relaxed text-muted-foreground">
            The likeliest failure mode is not technical. If every new store requires days of manual
            menu modeling, gross margin and rollout speed both collapse. Menu import tooling is
            therefore treated as core product scope in Phase 1, not a later optimization.
          </p>
        </Panel>
        <Panel eyebrow="Second risk" title="Voice unit economics">
          <p className="text-sm leading-relaxed text-muted-foreground">
            A flat subscription over a variable per-call cost is only safe if cost per completed
            order is known. Until the pilot produces that number, pricing stays provisional and
            contracts include a usage review clause.
          </p>
        </Panel>
        <Panel eyebrow="Third risk" title="Execution scope">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Six phases invite parallel work. The mitigation is structural: each phase has written
            exit criteria and the next phase does not begin until they are met in a live store.
          </p>
        </Panel>
      </div>
    </Section>
  );
}

export function S18Implementation() {
  return (
    <Section
      id="implementation"
      index={18}
      kicker="Implementation Plan"
      title="What must be true before anything else begins."
      lede="Sequencing is driven by dependency, not by enthusiasm. The menu engine and POS integration gate everything; every other module is a consumer of those two."
      alt
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Panel eyebrow="Order of work" title="First, next, later">
          <div className="space-y-4">
            {[
              ["First — blocking", ["Menu data model and engine", "POS integration and order injection", "Ordering engine with pricing and tax", "Pilot store baseline measurement"]],
              ["Next — dependent", ["Voice agent on the live menu", "Payments and prepaid orders", "Manager dashboard essentials", "Mobile app on the shared cart"]],
              ["Later — deferrable", ["Loyalty and CRM", "Marketing automation", "Corporate dashboard and templates", "Additional POS integrations"]],
            ].map(([t, items]) => (
              <div key={t as string} className="rounded-md border border-border bg-surface-2/50 p-4">
                <Kicker>{t as string}</Kicker>
                <Bullets className="mt-3" items={items as string[]} />
              </div>
            ))}
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel eyebrow="Dependencies" title="Hard prerequisites">
            <DataTable
              dense
              head={["Capability", "Cannot start until"]}
              rows={[
                ["Voice ordering", "Menu engine published and POS-mapped"],
                ["Mobile app", "Ordering engine and payments live"],
                ["Website ordering", "Mobile cart logic complete and reusable"],
                ["Loyalty", "Unified customer identity across channels"],
                ["Marketing", "Loyalty data and consent capture in place"],
                ["Corporate dashboard", "At least three stores producing comparable data"],
              ]}
            />
          </Panel>
          <Panel eyebrow="Gates" title="Milestones and decision points">
            <div className="space-y-3">
              {[
                ["M1", "First real order placed by voice and printed in a live kitchen", "Decision: is voice accuracy acceptable to continue?"],
                ["M2", "Pilot store runs 30 days on JARA voice", "Decision: what is true cost per completed order?"],
                ["M3", "Mobile app live with prepaid orders", "Decision: does channel mix shift as modeled?"],
                ["M4", "Three stores live on one menu template", "Decision: is onboarding time low enough to scale sales?"],
                ["M5", "Loyalty live with measurable repeat rate", "Decision: does the Growth tier justify its price?"],
              ].map(([m, t, d]) => (
                <div key={m} className="rounded-md border border-border bg-surface-2/50 p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-signal">{m}</span>
                    <span className="text-sm font-semibold">{t}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </Section>
  );
}

const useOfFunds = [
  { name: "Engineering", v: 46 },
  { name: "Infrastructure", v: 8 },
  { name: "Support & onboarding", v: 12 },
  { name: "Sales", v: 16 },
  { name: "Marketing", v: 10 },
  { name: "Legal & compliance", v: 5 },
  { name: "Reserve", v: 3 },
];

export function S19Investment() {
  return (
    <Section
      id="investment"
      index={19}
      kicker="Investment Requirements"
      title="What it takes to get from blueprint to a repeatable rollout."
      lede="The capital requirement is defined by one objective: reach a state where onboarding a new store is a predictable, low-cost, repeatable process with proven per-store economics."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <Panel eyebrow="Allocation" title="Illustrative use of funds (%)" action={<DataTag kind="illustrative" />}>
          <ChartFrame height={300}>
            <BarChart data={useOfFunds} layout="vertical" margin={{ left: 8, right: 24 }}>
              <CartesianGrid horizontal={false} stroke="var(--border)" />
              <XAxis type="number" domain={[0, 50]} {...axisProps} />
              <YAxis type="category" dataKey="name" width={140} {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Bar dataKey="v" radius={[0, 4, 4, 0]} barSize={18}>
                {useOfFunds.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? "var(--chart-1)" : "var(--chart-5)"} />
                ))}
              </Bar>
            </BarChart>
          </ChartFrame>
        </Panel>
        <div className="space-y-5">
          <Panel eyebrow="Requirement" title="What the capital buys">
            <DataTable
              dense
              head={["Category", "Purpose"]}
              rows={[
                ["Development", "Menu engine, ordering engine, voice, apps, dashboards"],
                ["Infrastructure", "Hosting, voice minutes, observability, security"],
                ["Support", "Onboarding tooling and a small support function"],
                ["Sales", "First dedicated seller and pilot-to-contract motion"],
                ["Marketing", "Case studies, category education, demand generation"],
                ["Legal", "Contracts, data ownership terms, privacy and payments compliance"],
              ]}
            />
          </Panel>
          <Panel eyebrow="Return" title="How ROI is judged">
            <Bullets
              items={[
                "Cost to onboard a store, trending down each cohort.",
                "Gross margin per store after voice and infrastructure cost.",
                "Net revenue retention as stores add modules.",
                "Payback period on customer acquisition cost.",
                "Store retention at 12 months.",
              ]}
            />
            <Note>
              Targets for each metric are set after the pilot. Publishing target numbers before the
              first measured cohort would be a projection presented as a plan.
            </Note>
          </Panel>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value="Phase 1–2" label="Funded scope" note="Voice and mobile to a live pilot cohort" tag="assumption" />
        <Stat value="12–18 mo" label="Runway objective" note="Through measured per-store economics" tag="assumption" />
        <Stat value="Pilot cohort" label="Proof unit" note="A small set of real stores, fully instrumented" tag="assumption" />
        <Stat value="Repeatability" label="Success definition" note="Not revenue scale — process reliability" tag="verified" />
      </div>
    </Section>
  );
}

export function S20Conclusion() {
  return (
    <Section
      id="conclusion"
      index={20}
      kicker="Conclusion"
      title="Ordering is the entry point. The operating system is the company."
      lede="A restaurant will replace an ordering vendor without much thought. It will not replace the system that holds its menu, its customers, its history, and its daily operating rhythm."
      alt
    >
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Panel className="on-navy relative overflow-hidden">
          <div className="grid-paper pointer-events-none absolute inset-0 opacity-25" aria-hidden />
          <div className="relative">
            <Kicker>The vision</Kicker>
            <p className="mt-4 font-display text-2xl leading-snug md:text-3xl">
              JARA RestaurantOS is not an ordering app with extra features. It is the layer between a
              restaurant's demand and its operations — and once it holds the menu, the customer, and
              the order stream, everything a restaurant needs to decide becomes answerable from
              inside one system.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Own the channel", "Every order arrives on infrastructure the restaurant controls."],
                ["Own the customer", "Identity, history, and consent stay with the brand."],
                ["Own the decisions", "Operations become measurable, then predictable."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-md border border-border bg-surface-2/60 p-4">
                  <div className="text-sm font-semibold">{t}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel eyebrow="Standard" title="How this document is used">
            <Bullets
              items={[
                "Every design decision must trace back to a section here.",
                "Every engineering scope change must name the section it revises.",
                "Every number added later must carry a verified, assumption, or illustrative label.",
                "This blueprint is versioned; it is expected to be corrected by evidence.",
              ]}
            />
          </Panel>
          <Panel eyebrow="Next" title="Immediate next actions">
            <Bullets
              items={[
                "Confirm the pilot store and capture its pre-JARA baseline.",
                "Finalize the menu data model and review it with engineering.",
                "Validate POS order injection end to end in a test environment.",
                "Set Phase 1 exit criteria in writing before development starts.",
              ]}
            />
          </Panel>
        </div>
      </div>

      <Reveal>
        <footer className="mt-16 border-t border-border pt-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="font-display text-xl">JARA RestaurantOS</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Strategic Blueprint v1.0 · Internal · Confidential
              </p>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
              This document contains forward-looking plans and illustrative models. Figures labeled
              illustrative or assumption are not results, forecasts, or commitments.
            </p>
          </div>
        </footer>
      </Reveal>
    </Section>
  );
}
