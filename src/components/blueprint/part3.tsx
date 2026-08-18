import { Section, Panel, Bullets, DataTable, DataTag, FlowNode, Note, Kicker, Stat } from "./primitives";
import { ChartFrame, axisProps, tooltipProps } from "./chart-frame";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Mic, PhoneCall, MessageSquare, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

export function S9Locations() {
  const inherit = [
    ["Menu", "Corporate template", "Store may 86 items and set local availability"],
    ["Pricing", "Regional price band", "Store may not exceed corporate bounds"],
    ["Hours", "Store-owned", "Corporate sees and can override for brand events"],
    ["Inventory", "Store-owned", "Signals roll up to region for supply planning"],
    ["Taxes", "Jurisdiction-derived", "Never manually set at store level"],
    ["Promotions", "Both", "Corporate campaigns plus store-local offers"],
  ];
  return (
    <Section
      id="locations"
      index={9}
      kicker="Location Architecture"
      title="Multi-location control with local autonomy where it matters."
      lede="Configuration flows down the hierarchy by inheritance. Corporate sets templates and boundaries; stores control the operational realities they alone can see."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <Panel eyebrow="Hierarchy" title="Corporate to store">
          <div className="space-y-2">
            {[
              ["Corporate", "Brand, templates, campaigns, reporting"],
              ["Region", "Price bands, regional menus, oversight"],
              ["Store", "The operating unit — one POS, one kitchen"],
              ["Manager", "Scoped account for one store"],
            ].map(([t, s], i, a) => (
              <div key={t}>
                <FlowNode title={t} sub={s} accent={i === 0} />
                {i < a.length - 1 && (
                  <div className="flex justify-center py-1">
                    <span className="h-4 w-px bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {["Menu", "Pricing", "Hours", "Inventory", "Taxes", "Promotions"].map((x) => (
              <div
                key={x}
                className="rounded border border-border bg-surface-2/60 px-2 py-2 text-center text-xs text-muted-foreground"
              >
                {x}
              </div>
            ))}
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel eyebrow="Inheritance" title="Who owns which setting">
            <DataTable dense head={["Setting", "Owner", "Local override"]} rows={inherit} />
          </Panel>
          <Panel eyebrow="Scale design" title="Built for the tenth store, not the first">
            <Bullets
              items={[
                "Onboarding a store is a configuration task, not an engineering task.",
                "A menu change can be published to one store, a region, or the brand.",
                "Every metric exists at store, region, and brand level from day one.",
                "Manager permissions are scoped to their store; data isolation is enforced server-side.",
              ]}
            />
          </Panel>
        </div>
      </div>
    </Section>
  );
}

const voiceFlow = [
  ["Call arrives", "Rosie answers on the first ring, every time, including during rush."],
  ["Identify", "Caller ID resolves to an existing profile and past orders when available."],
  ["Take order", "Natural conversation, required modifiers confirmed, ambiguity resolved by asking."],
  ["Upsell", "One relevant suggestion, based on the same rules the app uses."],
  ["Confirm", "Full order read back with total and ready time before submission."],
  ["Pay", "SMS payment link, or pay at pickup per store policy."],
  ["Inject", "Order enters the POS and prints in the kitchen as a normal ticket."],
  ["Escalate", "Anything outside scope transfers to a human with the context captured."],
];

export function S10Voice() {
  return (
    <Section
      id="voice"
      index={10}
      kicker="Voice Integration"
      title="Rosie answers the calls the restaurant is already missing."
      lede="Voice is the first phase because it addresses a loss the operator can observe directly. It uses the same menu engine, ordering engine, and customer graph as the app — it is a channel, not a separate product."
      alt
    >
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel eyebrow="Call flow" title="What happens on a call">
          <ol className="space-y-0">
            {voiceFlow.map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid size-7 place-items-center rounded-full border border-signal/40 bg-signal/10 font-mono text-[10px] text-signal">
                    {i + 1}
                  </span>
                  {i < voiceFlow.length - 1 && <span className="my-1 w-px flex-1 bg-border" />}
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
          <Panel eyebrow="Interplay" title="Voice and mobile reinforce each other">
            <div className="space-y-3">
              {[
                [PhoneCall, "Voice acquires", "The phone reaches customers who will never install an app."],
                [MessageSquare, "SMS bridges", "A receipt or payment link moves the customer into the app."],
                [Repeat, "App retains", "Once installed, reorder is one tap and marketing becomes possible."],
                [Mic, "Voice reorders", "\"The usual\" resolves to a stored order and confirms in seconds."],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Mic;
                return (
                  <div key={t as string} className="flex gap-3 rounded-md border border-border bg-surface-2/50 p-4">
                    <I className="mt-0.5 size-4 shrink-0 text-signal" />
                    <div>
                      <div className="text-sm font-semibold">{t as string}</div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>
          <Panel eyebrow="Guardrails" title="What Rosie will not do">
            <Bullets
              items={[
                "Improvise items or modifiers that do not exist in the published menu.",
                "Submit an order with an unresolved required modifier.",
                "Handle complaints, refunds, or large catering quotes — these escalate to staff.",
                "Continue when confidence is low; it asks or transfers instead.",
              ]}
            />
          </Panel>
        </div>
      </div>
      <Note>
        Voice performance targets (answer rate, completion rate, average handle time) will be set
        from the first pilot store's baseline. No accuracy figures are claimed in this document.
      </Note>
    </Section>
  );
}

const hours = [
  { h: "10a", o: 6 },
  { h: "11a", o: 14 },
  { h: "12p", o: 42 },
  { h: "1p", o: 38 },
  { h: "2p", o: 17 },
  { h: "3p", o: 9 },
  { h: "4p", o: 12 },
  { h: "5p", o: 28 },
  { h: "6p", o: 46 },
  { h: "7p", o: 39 },
  { h: "8p", o: 21 },
  { h: "9p", o: 8 },
];

const channelMix = [
  { name: "Voice", value: 34, fill: "var(--chart-1)" },
  { name: "Mobile app", value: 41, fill: "var(--chart-2)" },
  { name: "Website", value: 19, fill: "var(--chart-3)" },
  { name: "Walk-in digital", value: 6, fill: "var(--chart-4)" },
];

export function S11ManagerDashboard() {
  return (
    <Section
      id="manager"
      index={11}
      kicker="Manager Dashboard"
      title="The store's operating console, designed for a busy shift."
      lede="A manager checks this between tasks, on a tablet, with one hand. The layout prioritizes what needs action now over what is interesting later."
    >
      <Panel
        eyebrow="Mockup"
        title="Store view — Downtown"
        action={<DataTag kind="illustrative" label="Illustrative data" />}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Orders today", "218", "+12 vs. last Tue"],
            ["Net sales", "$6,412", "+8% vs. last Tue"],
            ["Avg ticket", "$29.41", "+$1.85 with upsells"],
            ["Calls answered", "100%", "62 handled by Rosie"],
          ].map(([l, v, s]) => (
            <div key={l} className="rounded-md border border-border bg-surface-2/60 p-4">
              <Kicker>{l}</Kicker>
              <div className="mt-1.5 font-display text-2xl">{v}</div>
              <div className="mt-1 text-[11px] text-muted-foreground">{s}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-md border border-border bg-surface-2/40 p-4">
            <Kicker>Orders by hour</Kicker>
            <ChartFrame height={220}>
              <BarChart data={hours} margin={{ top: 16, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="h" {...axisProps} />
                <YAxis {...axisProps} />
                <Tooltip {...tooltipProps} />
                <Bar dataKey="o" radius={[4, 4, 0, 0]}>
                  {hours.map((d, i) => (
                    <Cell key={i} fill={d.o > 35 ? "var(--chart-1)" : "var(--chart-5)"} />
                  ))}
                </Bar>
              </BarChart>
            </ChartFrame>
          </div>
          <div className="rounded-md border border-border bg-surface-2/40 p-4">
            <Kicker>Channel mix</Kicker>
            <ChartFrame height={220}>
              <PieChart>
                <Pie
                  data={channelMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={2}
                  stroke="var(--surface)"
                />
                <Tooltip {...tooltipProps} />
              </PieChart>
            </ChartFrame>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {channelMix.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="size-2 rounded-sm" style={{ background: c.fill }} />
                  {c.name} · {c.value}%
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>

      <div className="mt-5">
        <DataTable
          head={["Module", "What the manager does here", "Frequency"]}
          rows={[
            ["Live orders", "Watch the queue, flag delays, reprint tickets", "Continuous"],
            ["Sales", "Net sales, ticket average, discounts, refunds", "Daily"],
            ["Voice", "Call volume, completion, escalations, transcripts", "Daily"],
            ["Digital", "App vs. web performance, conversion, drop-off", "Weekly"],
            ["Customers", "Lookup, order history, service recovery", "As needed"],
            ["Peak hours", "Staffing and prep-time planning by daypart", "Weekly"],
            ["Reports", "Shift and period summaries, exports", "Daily / weekly"],
            ["Menu management", "86 items, pricing within bounds, descriptions", "Daily"],
            ["Hours", "Regular hours, holidays, temporary pause", "As needed"],
            ["Inventory", "Countdown quantities that auto-86 at zero", "Daily"],
            ["Promotions", "Local offers, time-boxed discounts", "Weekly"],
          ]}
        />
      </div>
    </Section>
  );
}

const storeTrend = [
  { m: "Jan", downtown: 182, airport: 141, campus: 96, mall: 118 },
  { m: "Feb", downtown: 194, airport: 138, campus: 104, mall: 122 },
  { m: "Mar", downtown: 210, airport: 152, campus: 121, mall: 127 },
  { m: "Apr", downtown: 226, airport: 149, campus: 118, mall: 133 },
  { m: "May", downtown: 241, airport: 163, campus: 132, mall: 129 },
  { m: "Jun", downtown: 258, airport: 171, campus: 127, mall: 141 },
];

const heat = [
  { store: "Downtown", vals: [12, 34, 68, 91, 74, 42] },
  { store: "Airport", vals: [48, 62, 55, 41, 38, 22] },
  { store: "Campus", vals: [8, 22, 77, 59, 88, 61] },
  { store: "Mall", vals: [14, 28, 52, 66, 81, 47] },
];
const heatCols = ["9a", "11a", "1p", "3p", "6p", "8p"];

export function S12Corporate() {
  return (
    <Section
      id="corporate"
      index={12}
      kicker="Corporate Dashboard"
      title="Every store, one comparison surface."
      lede="Corporate needs ranking and exception detection more than raw totals: which store is diverging, which item is underperforming where, and which change is worth rolling out to the brand."
      alt
    >
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Panel
          eyebrow="Trend"
          title="Monthly net sales by store ($K)"
          action={<DataTag kind="illustrative" />}
        >
          <ChartFrame height={280}>
            <LineChart data={storeTrend} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--border)" />
              <XAxis dataKey="m" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip {...tooltipProps} />
              {[
                ["downtown", "var(--chart-1)"],
                ["airport", "var(--chart-2)"],
                ["campus", "var(--chart-3)"],
                ["mall", "var(--chart-4)"],
              ].map(([k, c]) => (
                <Line key={k} type="monotone" dataKey={k} stroke={c} strokeWidth={2} dot={false} />
              ))}
            </LineChart>
          </ChartFrame>
        </Panel>
        <Panel eyebrow="Density" title="Order heat map by daypart" action={<DataTag kind="illustrative" />}>
          <div className="overflow-x-auto">
            <div className="min-w-[380px]">
              <div className="mb-2 grid grid-cols-[92px_repeat(6,1fr)] gap-1.5">
                <span />
                {heatCols.map((c) => (
                  <span key={c} className="text-center font-mono text-[10px] text-muted-foreground">
                    {c}
                  </span>
                ))}
              </div>
              {heat.map((r) => (
                <div key={r.store} className="mb-1.5 grid grid-cols-[92px_repeat(6,1fr)] items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">{r.store}</span>
                  {r.vals.map((v, i) => (
                    <span
                      key={i}
                      title={`${r.store} ${heatCols[i]}: ${v}`}
                      className="grid h-9 place-items-center rounded text-[10px] font-medium"
                      style={{
                        background: `color-mix(in oklab, var(--signal) ${v}%, var(--surface-2))`,
                        color: v > 55 ? "var(--primary-foreground)" : "var(--muted-foreground)",
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Note>
            A map view replaces this grid at higher store counts; the grid is the correct density for
            fewer than roughly twenty locations.
          </Note>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel eyebrow="Ranking" title="Store performance table" action={<DataTag kind="illustrative" />}>
          <DataTable
            dense
            head={["Store", "Net sales", "Orders", "Avg ticket", "vs. brand"]}
            rows={[
              ["Downtown", "$258K", "8,770", "$29.41", "+18%"],
              ["Airport", "$171K", "6,240", "$27.40", "-3%"],
              ["Mall", "$141K", "5,110", "$27.59", "-11%"],
              ["Campus", "$127K", "5,480", "$23.17", "-22%"],
            ]}
          />
        </Panel>
        <Panel eyebrow="Reporting" title="What corporate gets on a schedule">
          <Bullets
            items={[
              "Weekly brand summary: sales, orders, channel mix, ticket average.",
              "Exception report: stores diverging more than a set threshold from their trend.",
              "Item report: top and bottom performers, with per-store variance.",
              "Campaign report: lift attributable to each promotion, by store.",
              "Board-ready export in PDF and CSV.",
            ]}
          />
        </Panel>
      </div>
    </Section>
  );
}
