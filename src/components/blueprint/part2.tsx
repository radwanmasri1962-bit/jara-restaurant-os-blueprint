import { Section, Panel, Bullets, DataTable, DataTag, FlowNode, Note, Reveal, Kicker } from "./primitives";
import {
  Search,
  Smartphone,
  ShoppingCart,
  CreditCard,
  Printer,
  ChefHat,
  Bike,
  RefreshCw,
  Check,
  Minus,
} from "lucide-react";

const journey = [
  { icon: Search, t: "Discovery", d: "Customer finds the restaurant via search, social, in-store QR, or a call." },
  { icon: Smartphone, t: "Entry", d: "Opens the app, the website, or simply calls and reaches Rosie." },
  { icon: ShoppingCart, t: "Order", d: "Builds the order with required and optional modifiers, guided upsells." },
  { icon: CreditCard, t: "Pay", d: "Card on file or one-tap wallet; tip and pickup time confirmed." },
  { icon: Printer, t: "Inject", d: "Order lands in the POS and prints to the kitchen like any other ticket." },
  { icon: ChefHat, t: "Prepare", d: "Kitchen works the ticket; status updates flow back to the customer." },
  { icon: Bike, t: "Handoff", d: "Pickup, curbside, or delivery dispatch — confirmed and timestamped." },
  { icon: RefreshCw, t: "Return", d: "Reorder in one tap or one sentence; loyalty points applied." },
];

export function S5Journey() {
  return (
    <Section
      id="journey"
      index={5}
      kicker="Customer Journey"
      title="From discovery to reorder, with no dead ends."
      lede="The journey is designed so that every channel converges on the same order object, and every completed order strengthens the next one through stored preferences and loyalty."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {journey.map((s, i) => (
          <Reveal key={s.t} delay={i * 50}>
            <div className="card-elevated relative h-full p-5">
              <span className="absolute top-4 right-4 font-mono text-[10px] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <s.icon className="size-5 text-signal" />
              <div className="mt-3 text-sm font-semibold">{s.t}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel eyebrow="Time" title="Where the journey is won or lost">
          <DataTable
            dense
            head={["Moment", "Failure mode today", "JARA design response"]}
            rows={[
              ["First contact", "Nobody answers the phone", "Rosie answers every call, always"],
              ["Menu browse", "Stale or confusing menu", "Live menu shared across all channels"],
              ["Checkout", "Guest checkout friction", "Saved profile, card on file, one tap"],
              ["Post-order", "Silence until pickup", "Status updates and accurate ready time"],
              ["Next order", "Customer starts from zero", "Reorder from history by tap or voice"],
            ]}
          />
        </Panel>
        <Panel eyebrow="Continuity" title="One identity across three channels">
          <p className="text-sm leading-relaxed text-muted-foreground">
            A phone number resolves to the same customer as the app login. An order placed by voice
            appears in app history; an app favorite is available to Rosie on the next call.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              ["Voice → App", "Rosie sends a payment or receipt link by SMS; the customer lands in the app already recognized."],
              ["App → Voice", "Saved favorites and allergies inform how Rosie greets and confirms the order."],
              ["Web → Loyalty", "Web checkout enrolls the customer with the same points balance."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-md border border-border bg-surface-2/50 p-4">
                <div className="font-mono text-[11px] tracking-wide text-signal">{t}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Section>
  );
}

const archLayers: { label: string; nodes: { t: string; s: string }[]; accent?: boolean }[] = [
  {
    label: "Demand",
    nodes: [
      { t: "Mobile App", s: "iOS · Android" },
      { t: "Voice (Rosie)", s: "Inbound calls" },
      { t: "Website", s: "Responsive web" },
    ],
  },
  {
    label: "Platform core",
    accent: true,
    nodes: [
      { t: "Ordering Engine", s: "Cart, rules, validation" },
      { t: "Menu Engine", s: "Items, modifiers, pricing" },
      { t: "Payments", s: "Authorization & capture" },
    ],
  },
  {
    label: "Restaurant systems",
    nodes: [
      { t: "Toast POS", s: "Order injection" },
      { t: "Kitchen Printer", s: "Ticket routing" },
      { t: "Kitchen", s: "Preparation" },
    ],
  },
  {
    label: "Intelligence",
    nodes: [
      { t: "Analytics", s: "Event pipeline" },
      { t: "Manager Dashboard", s: "Single store" },
      { t: "Corporate Dashboard", s: "All stores" },
    ],
  },
];

export function S6Architecture() {
  return (
    <Section
      id="architecture"
      index={6}
      kicker="System Architecture"
      title="Every channel in. One order out. Data back."
      lede="The architecture has four layers. Demand surfaces collect intent, the platform core turns intent into a valid priced order, restaurant systems fulfill it, and the intelligence layer reads everything that happened."
      alt
    >
      <Panel className="relative overflow-hidden">
        <div className="grid-paper pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <div className="relative space-y-4">
          {archLayers.map((layer, li) => (
            <div key={layer.label}>
              <div className="mb-2 flex items-center gap-3">
                <Kicker>{layer.label}</Kicker>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {layer.nodes.map((n) => (
                  <FlowNode key={n.t} title={n.t} sub={n.s} accent={!!layer.accent} />
                ))}
              </div>
              {li < archLayers.length - 1 && (
                <div className="flex justify-center py-2">
                  <span className="h-6 w-px bg-gradient-to-b from-signal/60 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Panel>

      <div className="mt-5">
        <DataTable
          head={["Module", "What it does", "Why it exists"]}
          rows={[
            ["Mobile App", "Branded ordering, account, loyalty, reorder", "The retention channel — highest repeat rate"],
            ["Voice (Rosie)", "Answers calls, takes and confirms orders", "Captures demand that is lost today"],
            ["Website", "Ordering for customers who will not install an app", "Lowest-friction first order"],
            ["Ordering Engine", "Validates carts, applies rules, promos, taxes, timing", "Guarantees any channel produces a valid order"],
            ["Menu Engine", "Stores items, modifier groups, pricing, availability", "The single source of truth for what can be sold"],
            ["Payments", "Tokenizes cards, authorizes, captures, refunds", "Prepaid orders reduce no-shows and speed pickup"],
            ["POS Integration", "Injects orders into the restaurant's POS", "No new hardware, no parallel workflow"],
            ["Kitchen Printer", "Prints the ticket the kitchen already recognizes", "Zero retraining for kitchen staff"],
            ["Analytics", "Captures every event from browse to handoff", "Turns operations into measurable decisions"],
            ["Manager Dashboard", "Store operations, menu, hours, promotions", "Gives the operator daily control"],
            ["Corporate Dashboard", "Cross-store comparison and rollups", "Makes multi-location performance visible"],
          ]}
        />
        <Note>
          Toast is named as the first POS target because it is the most common platform among the
          restaurants JARA is engaging. The integration layer is designed to be POS-agnostic so
          additional platforms can be added without touching the ordering engine.
        </Note>
      </div>
    </Section>
  );
}

const featureMatrix: [string, boolean | "partial", boolean | "partial", boolean | "partial"][] = [
  ["Browse menu and place orders", true, false, false],
  ["Saved favorites and reorder", true, false, false],
  ["Loyalty balance and rewards", true, "partial", "partial"],
  ["Order status and notifications", true, true, false],
  ["Payment and receipts", true, "partial", false],
  ["Live order queue", false, true, "partial"],
  ["Refunds and order adjustments", false, true, "partial"],
  ["Menu item availability toggle (86)", false, true, false],
  ["Store hours and holiday overrides", false, true, "partial"],
  ["Local promotions", false, true, "partial"],
  ["Staff accounts and permissions", false, true, true],
  ["Store-level sales reporting", false, true, true],
  ["Cross-location comparison", false, false, true],
  ["Regional menu and price templates", false, false, true],
  ["Brand-wide campaigns", false, false, true],
  ["Corporate exports and board reporting", false, false, true],
];

function Mark({ v }: { v: boolean | "partial" }) {
  if (v === true) return <Check className="size-4 text-verified" aria-label="Included" />;
  if (v === "partial")
    return <span className="font-mono text-[10px] text-assumption">VIEW</span>;
  return <Minus className="size-4 text-muted-foreground/40" aria-label="Not included" />;
}

export function S7Features() {
  return (
    <Section
      id="features"
      index={7}
      kicker="Application Features"
      title="Three roles, three products, one platform."
      lede="Customer, store manager, and corporate operator each get a distinct surface. Permissions are role-scoped, not screen-hidden: a manager cannot reach another store's data at all."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          {
            k: "Role 01",
            t: "Customer",
            items: [
              "Menu browsing with photos and dietary tags",
              "Guided modifiers, combos, and upsells",
              "Saved cards, addresses, and allergy notes",
              "Order tracking and accurate ready times",
              "Loyalty points, rewards, and offers",
              "One-tap and voice reorder",
            ],
          },
          {
            k: "Role 02",
            t: "Store Manager",
            items: [
              "Live order queue across all channels",
              "86 items and adjust availability instantly",
              "Hours, holiday overrides, pause ordering",
              "Local promotions and prep-time control",
              "Daily sales, channel mix, peak hours",
              "Refunds, adjustments, and customer lookup",
            ],
          },
          {
            k: "Role 03",
            t: "Corporate",
            items: [
              "All-store performance in one view",
              "Regional menu and price templates",
              "Top and bottom store rankings",
              "Item performance across the brand",
              "Brand-wide campaigns and loyalty rules",
              "Exports and scheduled executive reports",
            ],
          },
        ].map((r) => (
          <Panel key={r.t} eyebrow={r.k} title={r.t} className="h-full">
            <Bullets items={r.items} />
          </Panel>
        ))}
      </div>

      <div className="mt-5">
        <div className="mb-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Check className="size-4 text-verified" /> Full capability
          </span>
          <span className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-assumption">VIEW</span> Read-only or scoped
          </span>
          <span className="flex items-center gap-1.5">
            <Minus className="size-4 text-muted-foreground/40" /> Not available
          </span>
        </div>
        <DataTable
          dense
          head={["Capability", "Customer", "Manager", "Corporate"]}
          rows={featureMatrix.map(([name, c, m, k]) => [
            name,
            <Mark key="c" v={c} />,
            <Mark key="m" v={m} />,
            <Mark key="k" v={k} />,
          ])}
        />
      </div>
    </Section>
  );
}

export function S8Menu() {
  return (
    <Section
      id="menu"
      index={8}
      kicker="Menu Architecture"
      title="The menu engine is the hardest part of the product."
      lede="Everything else depends on it. Ordering, pricing, tax, upsell logic, POS mapping, and voice comprehension are all downstream of how the menu is modeled. It is designed once, correctly, before any channel ships."
      alt
    >
      <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        <Panel eyebrow="Structure" title="Menu object hierarchy">
          <div className="space-y-2 font-mono text-xs">
            {[
              [0, "Menu", "Breakfast · Lunch · Catering"],
              [1, "Category", "Sandwiches, Sides, Drinks"],
              [2, "Product", "Chicken Shawarma Wrap"],
              [3, "Modifier Group", "Bread — required, choose 1"],
              [4, "Modifier", "Pita · Baguette · Lettuce wrap"],
              [3, "Modifier Group", "Toppings — optional, max 5"],
              [4, "Modifier", "Pickles (+$0.00) · Feta (+$1.25)"],
              [3, "Upsell Slot", "Add fries and a drink"],
              [2, "Combo", "Wrap + Side + Drink, bundle price"],
            ].map(([depth, label, ex], i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded border border-border/70 bg-surface-2/40 px-3 py-2"
                style={{ marginLeft: (depth as number) * 14 }}
              >
                <span className="text-signal">{"—".repeat(1)}</span>
                <div>
                  <div className="text-foreground">{label as string}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{ex as string}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel eyebrow="Rules" title="What the engine must enforce">
            <DataTable
              dense
              head={["Concept", "Rule model"]}
              rows={[
                ["Required modifiers", "Min 1, max N; order cannot be submitted without a valid choice"],
                ["Optional modifiers", "Zero to max N, each with its own price delta"],
                ["Nested modifiers", "A modifier may open a follow-up group (e.g. sauce → spice level)"],
                ["Combos", "Bundle of slots, each slot constrained to a category, with bundle pricing"],
                ["Upsells", "Rule-triggered suggestions by item, cart value, or daypart"],
                ["Pricing", "Base price plus modifier deltas, with location and channel overrides"],
                ["Taxes", "Tax group per item, resolved by store jurisdiction at order time"],
                ["Availability", "Per item, per daypart, per store; 86 toggles apply instantly"],
                ["Seasonal items", "Scheduled start and end dates with automatic activation"],
              ]}
            />
          </Panel>
          <div className="grid gap-5 md:grid-cols-2">
            <Panel eyebrow="Voice constraint" title="The menu must be speakable">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Every item and modifier carries spoken aliases and a disambiguation hint so Rosie can
                map "the chicken wrap" to the correct product without guessing. This is a menu-model
                requirement, not a voice feature.
              </p>
            </Panel>
            <Panel eyebrow="POS constraint" title="The menu must be mappable">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Each product and modifier holds an external POS identifier. Menu items without a
                confirmed mapping cannot be published to a live channel — this prevents unfulfillable
                orders reaching the kitchen.
              </p>
            </Panel>
          </div>
        </div>
      </div>
      <Note>
        Decision point for engineering: the menu engine is versioned and publish-based. Editing a
        draft never affects live ordering until it is published, and every publish is reversible.
      </Note>
    </Section>
  );
}
