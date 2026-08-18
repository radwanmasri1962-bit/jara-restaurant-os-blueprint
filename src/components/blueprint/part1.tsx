import {
  Section,
  Panel,
  Stat,
  Bullets,
  DataTable,
  DataTag,
  FlowNode,
  Note,
  Reveal,
  Kicker,
} from "./primitives";
import { ChartFrame, axisProps, tooltipProps } from "./chart-frame";
import {
  Phone,
  Globe,
  Smartphone,
  Truck,
  Mic,
  LayoutDashboard,
  Gift,
  BarChart3,
  Megaphone,
  Users,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";

export function Hero() {
  return (
    <header className="relative overflow-hidden px-5 pt-28 pb-20 sm:px-8 md:pt-36 md:pb-28">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--gradient-signal)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[10px] tracking-[0.2em] uppercase">
              JARA AI — Internal
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Confidential · Strategy Blueprint v1.0
            </span>
          </div>
          <h1 className="mt-8 max-w-4xl text-5xl leading-[0.98] text-balance md:text-7xl">
            JARA <span className="text-signal-gradient">RestaurantOS</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            The strategic blueprint for a unified restaurant ordering and operations platform —
            architecture, business model, financial framework, and execution roadmap, defined before
            a single line of production code is written.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Audience", "Founder · Investors · CTO · Product · Engineering · Restaurant execs"],
              ["Purpose", "Define the product before building it"],
              ["Scope", "20 sections · architecture to capital plan"],
              ["Status", "Pre-development decision document"],
            ].map(([k, v]) => (
              <div key={k} className="card-elevated p-4">
                <Kicker>{k}</Kicker>
                <p className="mt-2 text-sm leading-snug text-foreground/90">{v}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface/70 p-4">
            <span className="text-xs text-muted-foreground">Every figure in this document is labeled:</span>
            <DataTag kind="verified" label="Verified fact" />
            <DataTag kind="assumption" label="Working assumption" />
            <DataTag kind="illustrative" label="Illustrative model" />
          </div>
        </Reveal>
      </div>
    </header>
  );
}

export function S1ExecutiveSummary() {
  return (
    <Section
      id="executive-summary"
      index={1}
      kicker="Executive Summary"
      title="One platform that owns the restaurant's ordering relationship end to end."
      lede="JARA RestaurantOS unifies voice, mobile, and web ordering on a single menu and customer graph, writes orders straight into the restaurant's existing POS, and returns the data layer restaurants currently rent from third parties."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        <Panel eyebrow="What" title="What are we building?" className="lg:col-span-1">
          <Bullets
            items={[
              "An AI voice agent (Rosie) that answers every call and takes complete, accurate orders.",
              "A branded mobile app and ordering website sharing one menu engine.",
              "Loyalty, CRM, and marketing built on first-party order data.",
              "Manager and corporate dashboards for operations and multi-location intelligence.",
            ]}
          />
        </Panel>
        <Panel eyebrow="Why" title="Why are we building it?">
          <Bullets
            items={[
              "Restaurants lose orders every day to unanswered phones and abandoned digital flows.",
              "Third-party marketplaces take a margin and keep the customer relationship.",
              "Existing digital ordering vendors solve one channel each; nobody owns the whole surface.",
              "Voice is the wedge: it is the channel with the clearest, most measurable loss today.",
            ]}
          />
        </Panel>
        <Panel eyebrow="Why now" title="Why now?">
          <Bullets
            items={[
              "Speech models are finally fast and accurate enough for live order-taking.",
              "POS platforms expose ordering APIs that make direct integration practical.",
              "Labor cost pressure makes automating the phone an operations decision, not a tech one.",
              "Consumers already expect app ordering from independent and regional brands.",
            ]}
          />
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Panel eyebrow="Problem" title="The problem in one sentence">
          <p className="text-lg leading-relaxed text-foreground/90">
            A restaurant's demand arrives through four disconnected channels — phone, web, app, and
            marketplaces — and only the marketplace channel is instrumented, so operators cannot see,
            serve, or keep their own customers.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["Fragmented ordering", "Four channels, four menus, four sources of truth."],
              ["Invisible demand", "Missed calls and abandoned carts leave no record."],
              ["Rented customers", "Marketplaces own the data and the repeat purchase."],
              ["Manual operations", "Menu, hours, and pricing updated by hand in every system."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-md border border-border bg-surface-2/50 p-4">
                <div className="text-sm font-semibold">{t}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel eyebrow="Horizon" title="Long-term vision">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Ordering is the entry point, not the destination. Once JARA owns the menu, the customer
            graph, and the order stream, the same platform extends into inventory signals, staffing
            forecasts, pricing intelligence, and multi-location corporate planning.
          </p>
          <div className="mt-6 space-y-3">
            {[
              ["Year 1", "Ordering platform — voice, mobile, web, one menu."],
              ["Year 2", "Retention layer — loyalty, CRM, automated marketing."],
              ["Year 3", "Operating system — forecasting, inventory, corporate intelligence."],
            ].map(([y, d], i) => (
              <div key={y} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid size-7 place-items-center rounded-full border border-signal/40 bg-signal/10 font-mono text-[10px] text-signal">
                    {i + 1}
                  </span>
                  {i < 2 && <span className="my-1 w-px flex-1 bg-border" />}
                </div>
                <div className="pb-3">
                  <div className="text-sm font-semibold">{y}</div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Note>
        This summary states strategy, not measured results. No performance claims in this document
        are based on production JARA data; all quantities are labeled as assumptions or illustrative
        models.
      </Note>
    </Section>
  );
}

const channelPain = [
  {
    icon: Phone,
    name: "Phone",
    how: "Customer calls; staff answers between in-store tasks.",
    pains: [
      "Calls go unanswered during peak periods",
      "Order errors from noisy, rushed environments",
      "No record of the call that was missed",
      "Staff pulled away from guests in front of them",
    ],
  },
  {
    icon: Globe,
    name: "Website",
    how: "Generic ordering page, often a vendor subdomain.",
    pains: [
      "Menu drifts out of sync with the POS",
      "Slow, unbranded checkout increases abandonment",
      "No customer profile, no reorder memory",
      "Little to no analytics returned to the operator",
    ],
  },
  {
    icon: Smartphone,
    name: "Own app",
    how: "If it exists, usually a template build.",
    pains: [
      "Low install base, rarely promoted",
      "Feature-frozen after launch",
      "Separate menu maintenance burden",
      "Loyalty disconnected from ordering",
    ],
  },
  {
    icon: Truck,
    name: "Marketplaces",
    how: "Third-party apps handle discovery and delivery.",
    pains: [
      "Commission on every order",
      "Customer identity retained by the platform",
      "Brand experience controlled by someone else",
      "Menu and pricing managed in yet another portal",
    ],
  },
];

export function S2Problem() {
  return (
    <Section
      id="problem"
      index={2}
      kicker="The Restaurant Problem"
      title="Four ordering channels. One kitchen. No shared system."
      lede="Every channel a restaurant uses today was added to solve a single problem, and none of them were designed to work with the others. The result is operational drag on the staff and friction for the customer."
      alt
    >
      <div className="grid gap-5 md:grid-cols-2">
        {channelPain.map((c) => (
          <Reveal key={c.name}>
            <Panel className="h-full">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-md border border-border bg-surface-2">
                  <c.icon className="size-5 text-signal" />
                </span>
                <div>
                  <h3 className="text-lg">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.how}</p>
                </div>
              </div>
              <Bullets className="mt-5" items={c.pains} />
            </Panel>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel eyebrow="Workflow today" title="A phone order, step by step">
          <ol className="space-y-0">
            {[
              ["Customer calls", "No queue, no callback, no visibility."],
              ["Staff interrupts service", "A person leaves the counter or the line."],
              ["Order taken verbally", "Modifiers and allergies captured by memory."],
              ["Handwritten or keyed in", "Re-entry into the POS introduces errors."],
              ["Payment on pickup", "No prepayment, so no-shows cost food."],
              ["No data retained", "The customer is anonymous again tomorrow."],
            ].map(([t, d], i, arr) => (
              <li key={t} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid size-6 place-items-center rounded-full border border-border bg-surface-2 font-mono text-[10px]">
                    {i + 1}
                  </span>
                  {i < arr.length - 1 && <span className="my-1 w-px flex-1 bg-border" />}
                </div>
                <div className="pb-4">
                  <div className="text-sm font-semibold">{t}</div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>

        <div className="space-y-5">
          <Panel eyebrow="Where value leaks" title="Four categories of loss">
            <DataTable
              dense
              head={["Loss", "Mechanism", "Who absorbs it"]}
              rows={[
                ["Missed orders", "Unanswered or abandoned calls at peak", "Restaurant revenue"],
                ["Labor drag", "Staff time spent on order entry", "Restaurant payroll"],
                ["Ticket size", "No consistent upsell prompt", "Restaurant margin"],
                ["Retention", "No identity, no reorder path", "Lifetime value"],
              ]}
            />
            <Note>
              Magnitudes vary widely by concept, volume, and daypart. JARA measures each of these per
              store during onboarding rather than assuming an industry average.
            </Note>
          </Panel>
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat value="4" label="Ordering channels" note="Phone, web, app, marketplace" tag="verified" />
            <Stat value="1" label="Kitchen" note="All channels converge here" tag="verified" />
            <Stat value="0" label="Shared systems" note="No common menu or customer record" tag="verified" />
          </div>
        </div>
      </div>
    </Section>
  );
}

const trendData = [
  { name: "Voice AI maturity", v: 88 },
  { name: "Mobile ordering", v: 82 },
  { name: "First-party data push", v: 76 },
  { name: "POS API openness", v: 64 },
  { name: "Labor cost pressure", v: 91 },
  { name: "Marketplace fatigue", v: 71 },
];

export function S3Opportunity() {
  return (
    <Section
      id="opportunity"
      index={3}
      kicker="The Opportunity"
      title="Several slow trends just became simultaneously true."
      lede="None of these forces are new on their own. What is new is the overlap: usable real-time voice models, open POS APIs, and operator appetite to reclaim direct channels are all present in the same window."
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <Panel
          eyebrow="Forces"
          title="Relative pressure on restaurant ordering"
          action={<DataTag kind="illustrative" />}
        >
          <ChartFrame height={280}>
            <BarChart data={trendData} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid horizontal={false} stroke="var(--border)" />
              <XAxis type="number" domain={[0, 100]} {...axisProps} />
              <YAxis type="category" dataKey="name" width={130} {...axisProps} />
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Bar dataKey="v" radius={[0, 4, 4, 0]} barSize={16}>
                {trendData.map((_, i) => (
                  <Cell key={i} fill={i % 2 ? "var(--chart-2)" : "var(--chart-1)"} />
                ))}
              </Bar>
            </BarChart>
          </ChartFrame>
          <Note>
            Illustrative scoring of directional pressure, authored by the JARA team to prioritize
            build order. Not survey data and not a market forecast.
          </Note>
        </Panel>

        <div className="space-y-5">
          <Panel eyebrow="Trends" title="What changed">
            <DataTable
              dense
              head={["Trend", "What it enables for JARA"]}
              rows={[
                ["Real-time speech models", "A voice agent that can hold a natural ordering conversation"],
                ["Ubiquitous mobile ordering", "Customers already know how to order from a branded app"],
                ["Open POS integrations", "Orders can be injected into existing kitchen workflow"],
                ["First-party data strategy", "Operators want their customer list back"],
                ["Persistent labor scarcity", "Automating the phone is now a staffing decision"],
              ]}
            />
          </Panel>
          <Panel eyebrow="Positioning" title="Where JARA fits">
            <p className="text-sm leading-relaxed text-muted-foreground">
              JARA does not compete with the POS and does not become a marketplace. It sits between
              the customer and the restaurant's existing kitchen systems as the demand layer: every
              channel in, one normalized order out, all data retained by the restaurant.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <FlowNode title="Demand" sub="Voice · App · Web" />
              <ArrowRight className="size-4 text-muted-foreground" />
              <FlowNode title="JARA layer" sub="Menu · Orders · Identity" accent />
              <ArrowRight className="size-4 text-muted-foreground" />
              <FlowNode title="Restaurant" sub="POS · Kitchen · Staff" />
            </div>
          </Panel>
        </div>
      </div>
    </Section>
  );
}

const ecosystem = [
  { icon: Mic, name: "Voice (Rosie)", desc: "AI phone agent taking full orders" },
  { icon: Smartphone, name: "Mobile App", desc: "Branded iOS and Android ordering" },
  { icon: Globe, name: "Website Ordering", desc: "Same menu, same cart, on the web" },
  { icon: Gift, name: "Loyalty", desc: "Points, rewards, and offers" },
  { icon: Users, name: "CRM", desc: "One customer profile across channels" },
  { icon: Megaphone, name: "Marketing", desc: "Segmented push, SMS, and email" },
  { icon: BarChart3, name: "Analytics", desc: "Sales, channels, items, dayparts" },
  { icon: LayoutDashboard, name: "Manager Portal", desc: "Store-level operations control" },
  { icon: Building2, name: "Corporate", desc: "Multi-location intelligence" },
];

export function S4ProductVision() {
  return (
    <Section
      id="vision"
      index={4}
      kicker="Product Vision"
      title="JARA RestaurantOS — one platform, every ordering channel."
      lede="Each surface a customer touches is a client of the same core: one menu engine, one order pipeline, one customer record. Adding a channel never means adding a second system to maintain."
      alt
    >
      <Panel className="relative overflow-hidden">
        <div className="grid-paper pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="relative">
          <div className="mx-auto mb-8 max-w-md rounded-lg border border-signal/50 bg-signal/10 p-5 text-center">
            <Kicker>Core</Kicker>
            <div className="mt-1 font-display text-2xl">RestaurantOS Core</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Menu engine · Ordering engine · Customer graph · POS bridge
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystem.map((e) => (
              <div
                key={e.name}
                className="group rounded-md border border-border bg-surface-2/60 p-4 transition-colors hover:border-signal/50"
              >
                <e.icon className="size-5 text-signal" />
                <div className="mt-3 text-sm font-semibold">{e.name}</div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <Panel eyebrow="Principle 01" title="One source of truth">
          <p className="text-sm leading-relaxed text-muted-foreground">
            A menu item, its modifiers, its price, and its availability are defined once. Every
            channel reads the same definition, so channels can never disagree.
          </p>
        </Panel>
        <Panel eyebrow="Principle 02" title="The POS stays">
          <p className="text-sm leading-relaxed text-muted-foreground">
            JARA integrates with the restaurant's existing point of sale rather than replacing it.
            Adoption requires no change to how the kitchen already works.
          </p>
        </Panel>
        <Panel eyebrow="Principle 03" title="The restaurant owns the data">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Customer identity, order history, and marketing consent belong to the restaurant. JARA
            operates the platform; it does not intermediate the relationship.
          </p>
        </Panel>
      </div>
    </Section>
  );
}
