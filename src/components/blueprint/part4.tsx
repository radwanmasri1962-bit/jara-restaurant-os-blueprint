import { Section, Panel, Bullets, DataTable, DataTag, Note, Stat, Kicker, Reveal } from "./primitives";
import { ChartFrame, axisProps, tooltipProps } from "./chart-frame";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Check, Minus } from "lucide-react";

const arrModel = [
  { m: "M3", stores: 2, mrr: 1.6, cost: 22 },
  { m: "M6", stores: 6, mrr: 5.1, cost: 26 },
  { m: "M9", stores: 14, mrr: 12.3, cost: 31 },
  { m: "M12", stores: 25, mrr: 22.5, cost: 36 },
  { m: "M18", stores: 55, mrr: 51.0, cost: 48 },
  { m: "M24", stores: 100, mrr: 95.0, cost: 63 },
];

export function S13Financial() {
  return (
    <Section
      id="financial"
      index={13}
      kicker="Financial Model"
      title="Two ledgers: what JARA spends and earns, what the restaurant saves and gains."
      lede="Both sides are modeled with explicit assumptions. Nothing here is measured performance — these are the structural relationships the business must satisfy, with placeholder inputs to be replaced by pilot data."
    >
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-illustrative/30 bg-illustrative/5 p-4">
        <DataTag kind="illustrative" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          All figures in this section are illustrative placeholders used to test model shape and unit
          economics. They are not forecasts, commitments, or results.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel eyebrow="Perspective A" title="JARA AI — cost structure">
          <DataTable
            dense
            head={["Line", "Nature", "Illustrative"]}
            rows={[
              ["Initial development", "One-time capital", "$180K – $260K"],
              ["Cloud infrastructure", "Variable with volume", "$400 – $1,200 / mo"],
              ["Voice minutes & models", "Variable per call", "Largest variable cost"],
              ["Payments processing", "Pass-through", "Set by processor"],
              ["Support & onboarding", "Semi-fixed per store", "Falls with tooling"],
              ["Future staffing", "Step function", "Eng, support, sales"],
            ]}
          />
          <Note>
            Voice cost per completed order is the single most important unit-economics input. It must
            be measured in the pilot before pricing is finalized.
          </Note>
        </Panel>
        <Panel eyebrow="Perspective A" title="JARA AI — revenue model">
          <DataTable
            dense
            head={["Stream", "Structure", "Illustrative"]}
            rows={[
              ["Setup / onboarding", "One-time per store", "$1,500 – $3,500"],
              ["Platform subscription", "Recurring per store", "$500 – $1,200 / mo"],
              ["Voice module", "Recurring or usage-based", "Included or metered"],
              ["Loyalty & marketing", "Recurring add-on", "$150 – $400 / mo"],
              ["Corporate intelligence", "Recurring per brand", "Priced per store count"],
              ["Professional services", "Project-based", "Menu build, migration"],
            ]}
          />
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat value="Recurring" label="Revenue quality" note="Subscription-led, not per-order" />
            <Stat value="Per store" label="Unit of scale" note="Not per brand, not per order" />
            <Stat value="Expanding" label="Account growth" note="Modules added over time" />
          </div>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Panel
          eyebrow="Scaling"
          title="Recurring revenue vs. platform cost ($K/month)"
          action={<DataTag kind="illustrative" />}
        >
          <ChartFrame height={280}>
            <ComposedChart data={arrModel} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="m" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipProps} />
              <Legend wrapperStyle={{ fontSize: 11, color: "var(--muted-foreground)" }} />
              <Bar name="Platform cost" dataKey="cost" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
              <Line name="MRR" type="monotone" dataKey="mrr" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
              <Line name="Stores live" type="monotone" dataKey="stores" stroke="var(--chart-2)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            </ComposedChart>
          </ChartFrame>
          <Note>
            Model shape assumption: fixed platform cost grows sub-linearly with store count while
            recurring revenue grows linearly, producing margin expansion after the crossover point.
            The crossover month is a function of sales velocity, not of engineering.
          </Note>
        </Panel>
        <Panel eyebrow="Perspective B" title="Restaurant — value equation">
          <DataTable
            dense
            head={["Line", "Direction", "Driver"]}
            rows={[
              ["Setup fee", "Cost", "One-time"],
              ["Monthly subscription", "Cost", "Fixed and predictable"],
              ["Recovered orders", "Gain", "Calls that used to go unanswered"],
              ["Labor reallocation", "Gain", "Staff time returned to service"],
              ["Higher average ticket", "Gain", "Consistent modifier and upsell prompts"],
              ["Marketplace commission", "Gain", "Volume shifted to direct channels"],
              ["Retention", "Gain", "Loyalty and reorder on owned channels"],
            ]}
          />
          <Note>
            Every gain line must be measured against a store-specific baseline captured before
            go-live. JARA does not present category averages as expected outcomes.
          </Note>
        </Panel>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat value="Assumption" label="Store count trajectory" note="Sales-capacity driven, not demand-proven" tag="assumption" />
        <Stat value="Assumption" label="Subscription price band" note="To be validated in pilot negotiations" tag="assumption" />
        <Stat value="Unknown" label="Voice cost per order" note="Requires live call volume to measure" tag="assumption" />
        <Stat value="Unknown" label="Channel shift rate" note="How fast marketplace volume moves direct" tag="assumption" />
      </div>
    </Section>
  );
}

const tiers = [
  {
    name: "Voice",
    tagline: "Entry point",
    includes: ["AI phone ordering", "POS injection", "Call analytics", "Basic customer records"],
    fit: "Single store proving the concept",
  },
  {
    name: "Digital",
    tagline: "Core platform",
    includes: ["Everything in Voice", "Mobile app", "Ordering website", "Manager dashboard", "Menu engine"],
    fit: "Operators consolidating channels",
    featured: true,
  },
  {
    name: "Growth",
    tagline: "Retention layer",
    includes: ["Everything in Digital", "Loyalty program", "CRM", "Campaigns and segments"],
    fit: "Brands focused on repeat business",
  },
  {
    name: "Enterprise",
    tagline: "Multi-location",
    includes: ["Everything in Growth", "Corporate dashboard", "Regional templates", "Executive reporting", "SLA and priority support"],
    fit: "Multi-store and franchise groups",
  },
];

export function S14BusinessModel() {
  return (
    <Section
      id="business-model"
      index={14}
      kicker="Business Model"
      title="Subscription first, modules on top, expansion by design."
      lede="Pricing follows the product architecture: a store buys the channel it needs today and adds modules as the platform proves itself. Revenue per account grows without a new sales cycle."
      alt
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tiers.map((t, i) => (
          <Reveal key={t.name} delay={i * 60}>
            <div
              className={
                "card-elevated flex h-full flex-col p-5 " +
                (t.featured ? "border-signal/50 bg-signal/5" : "")
              }
            >
              <Kicker>{t.tagline}</Kicker>
              <div className="mt-1 font-display text-2xl">{t.name}</div>
              <ul className="mt-4 flex-1 space-y-2">
                {t.includes.map((x) => (
                  <li key={x} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-verified" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-border pt-3 text-[11px] text-muted-foreground">{t.fit}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Note>
        Tier composition is a product decision recorded here; price points remain open and are
        modeled illustratively in Section 13.
      </Note>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Panel eyebrow="Add-ons" title="Optional modules">
          <Bullets
            items={[
              "Delivery dispatch integration",
              "Catering and large-order workflow",
              "Gift cards and stored value",
              "Kiosk and drive-through ordering",
              "Advanced reporting and data export",
            ]}
          />
        </Panel>
        <Panel eyebrow="Expansion" title="How an account grows">
          <div className="space-y-3">
            {[
              ["Land", "One store, voice only"],
              ["Prove", "Measured against that store's own baseline"],
              ["Expand", "Add mobile, web, loyalty"],
              ["Multiply", "Roll out to remaining locations"],
              ["Deepen", "Corporate tier and intelligence modules"],
            ].map(([t, d], i, a) => (
              <div key={t} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="grid size-6 place-items-center rounded-full border border-signal/40 bg-signal/10 font-mono text-[10px] text-signal">
                    {i + 1}
                  </span>
                  {i < a.length - 1 && <span className="my-1 w-px flex-1 bg-border" />}
                </div>
                <div className="pb-2">
                  <div className="text-sm font-semibold">{t}</div>
                  <p className="text-xs text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel eyebrow="Future" title="Adjacent products">
          <Bullets
            items={[
              "Demand forecasting from order history",
              "Inventory and purchasing signals",
              "Labor scheduling informed by predicted volume",
              "Menu pricing intelligence across locations",
              "Franchise performance benchmarking",
            ]}
          />
          <Note>Directional roadmap, not committed scope.</Note>
        </Panel>
      </div>
    </Section>
  );
}

type C = boolean | "partial";
const compRows: [string, string, C, C, C, C][] = [
  ["Toast", "POS platform with add-on online ordering", true, "partial", false, "partial"],
  ["Lunchbox", "Digital ordering suite for enterprise brands", false, true, "partial", "partial"],
  ["Olo", "Enterprise ordering and delivery infrastructure", false, true, "partial", true],
  ["Owner.com", "Website, app and marketing for independents", false, true, "partial", false],
  ["Incentivio", "Digital ordering with loyalty and engagement", false, true, true, "partial"],
  ["Custom app builds", "One-off agency projects", false, "partial", "partial", false],
  ["Phone answering services", "Human or scripted call handling", "partial", false, false, false],
  ["JARA RestaurantOS", "Voice, mobile, web on one menu and POS bridge", true, true, true, true],
];

function M({ v }: { v: C }) {
  if (v === true) return <Check className="size-4 text-verified" />;
  if (v === "partial") return <span className="font-mono text-[10px] text-assumption">PARTIAL</span>;
  return <Minus className="size-4 text-muted-foreground/40" />;
}

export function S15Competition() {
  return (
    <Section
      id="competition"
      index={15}
      kicker="Competitive Position"
      title="The category is crowded. The combination is not."
      lede="Each incumbent is credible in its lane. JARA's differentiation is not being better at any single channel — it is that voice, mobile, and web run on one menu engine and one customer record, sold to operators who are not enterprise brands."
    >
      <DataTable
        dense
        head={["Player", "Primary focus", "AI voice", "Digital ordering", "Loyalty / CRM", "Multi-location"]}
        rows={compRows.map(([n, f, a, b, c, d]) => [
          n,
          f,
          <M key="a" v={a} />,
          <M key="b" v={b} />,
          <M key="c" v={c} />,
          <M key="d" v={d} />,
        ])}
      />
      <Note>
        Capability marks reflect JARA's current understanding of each vendor's publicly described
        product scope and must be re-verified before external use. Vendors ship quickly; treat this
        table as a snapshot, not a standing claim.
      </Note>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <Panel eyebrow="Where JARA wins" title="Differentiation">
          <Bullets
            items={[
              "Voice as a first-class ordering channel, not an answering service.",
              "One menu engine shared by every channel, including voice.",
              "Built for regional and independent operators, not only enterprise brands.",
              "POS-integrated rather than POS-replacing.",
            ]}
          />
        </Panel>
        <Panel eyebrow="Where JARA is behind" title="Honest gaps">
          <Bullets
            items={[
              "No production track record or reference customers yet.",
              "No integration breadth — one POS at launch.",
              "No delivery network or marketplace demand.",
              "Small team versus funded incumbents with sales organizations.",
            ]}
          />
        </Panel>
        <Panel eyebrow="Defensibility" title="What compounds">
          <Bullets
            items={[
              "Menu models are costly to rebuild once configured and mapped.",
              "Customer graph and order history accumulate only on the incumbent platform.",
              "Voice quality improves with restaurant-specific vocabulary and history.",
              "Multi-location rollouts create switching cost across a whole brand.",
            ]}
          />
        </Panel>
      </div>
    </Section>
  );
}

const phases = [
  { p: "Phase 1", t: "Voice", d: "Rosie takes complete orders and injects them into the POS.", out: "Proof that a channel can be automated end to end." },
  { p: "Phase 2", t: "Mobile Ordering", d: "Branded app on the shared menu and ordering engine.", out: "The retention channel and the payments backbone." },
  { p: "Phase 3", t: "Website Ordering", d: "Web checkout reusing the app's cart and pricing logic.", out: "Full channel coverage on one menu." },
  { p: "Phase 4", t: "Loyalty", d: "Points, rewards, and identity unified across channels.", out: "Repeat purchase becomes measurable and improvable." },
  { p: "Phase 5", t: "Marketing", d: "Segmentation, push, SMS, and campaign attribution.", out: "The platform starts generating demand, not just capturing it." },
  { p: "Phase 6", t: "Corporate Intelligence", d: "Cross-location analytics, templates, executive reporting.", out: "Enterprise tier and multi-store expansion." },
];

export function S16Roadmap() {
  return (
    <Section
      id="roadmap"
      index={16}
      kicker="Development Roadmap"
      title="Six phases, each shippable and each independently valuable."
      lede="The order is deliberate: start with the channel that proves value fastest, then build the channels that retain the customer, then the intelligence that expands the account."
      alt
    >
      <div className="relative">
        <span className="absolute top-0 bottom-0 left-[15px] w-px bg-border md:left-1/2" aria-hidden />
        <div className="space-y-6">
          {phases.map((ph, i) => (
            <Reveal key={ph.p} delay={i * 60}>
              <div
                className={
                  "relative pl-10 md:w-1/2 md:pl-0 " +
                  (i % 2 ? "md:ml-auto md:pl-10" : "md:pr-10 md:text-right")
                }
              >
                <span
                  className={
                    "absolute top-5 grid size-8 place-items-center rounded-full border border-signal/50 bg-background font-mono text-[10px] text-signal " +
                    (i % 2 ? "left-0 md:-left-4" : "left-0 md:-right-4 md:left-auto")
                  }
                >
                  {i + 1}
                </span>
                <div className="card-elevated p-5">
                  <Kicker>{ph.p}</Kicker>
                  <h3 className="mt-1 text-xl">{ph.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ph.d}</p>
                  <p className="mt-3 border-t border-border pt-3 text-xs text-signal">{ph.out}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Note>
        Phase durations are intentionally omitted here; they are set in Section 18 against
        dependencies and staffing rather than as fixed calendar promises.
      </Note>
    </Section>
  );
}
