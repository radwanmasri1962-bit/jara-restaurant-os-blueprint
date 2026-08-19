import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("kicker", className)}>{children}</div>;
}

export function Section({
  id,
  index,
  kicker,
  title,
  lede,
  children,
  alt,
}: {
  id: string;
  index: number;
  kicker: string;
  title: string;
  lede?: string;
  children: ReactNode;
  alt?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 border-t border-border/70 px-5 py-24 sm:px-8 md:py-36",
        alt && "bg-surface-2/60",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <header className="mb-14 max-w-3xl md:mb-20">
            <div className="flex items-center gap-3">
              <span className="icon-chip size-7 font-mono text-[11px] font-semibold">
                {String(index).padStart(2, "0")}
              </span>
              <span className="h-px w-10 bg-gradient-to-r from-signal/60 to-transparent" />
              <Kicker>{kicker}</Kicker>
            </div>
            <h2 className="mt-6 text-3xl leading-[1.05] tracking-tight text-balance md:text-[3.25rem]">
              {title}
            </h2>
            {lede ? (
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {lede}
              </p>
            ) : null}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

export function Panel({
  children,
  className,
  title,
  eyebrow,
  action,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <div className={cn("card-elevated card-interactive p-6 md:p-8", className)}>
      {(title || eyebrow || action) && (
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            {eyebrow ? <Kicker>{eyebrow}</Kicker> : null}
            {title ? (
              <h3 className="mt-1 text-lg leading-snug md:text-xl">{title}</h3>
            ) : null}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

type TagKind = "verified" | "assumption" | "illustrative";

const tagStyles: Record<TagKind, string> = {
  verified: "border-verified/30 text-verified bg-verified/8",
  assumption: "border-assumption/30 text-assumption bg-assumption/8",
  illustrative: "border-illustrative/30 text-illustrative bg-illustrative/8",
};

const tagLabels: Record<TagKind, string> = {
  verified: "Verified",
  assumption: "Assumption",
  illustrative: "Illustrative",
};

export function DataTag({ kind, label }: { kind: TagKind; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase",
        tagStyles[kind],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label ?? tagLabels[kind]}
    </span>
  );
}

export function Stat({
  value,
  label,
  note,
  tag,
}: {
  value: string;
  label: string;
  note?: string;
  tag?: TagKind;
}) {
  return (
    <div className="card-elevated card-interactive group relative overflow-hidden p-6">
      <span
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[image:var(--gradient-signal)] transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden
      />
      <div className="tabular font-display text-3xl leading-none font-semibold tracking-tight text-foreground md:text-4xl">
        {value}
      </div>
      <div className="mt-3 text-sm font-semibold text-foreground/90">{label}</div>
      {note ? <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{note}</p> : null}
      {tag ? (
        <div className="mt-3">
          <DataTag kind={tag} />
        </div>
      ) : null}
    </div>
  );
}

export function Bullets({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
          <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_0_3px_color-mix(in_oklab,var(--signal)_15%,transparent)]" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function DataTable({
  head,
  rows,
  dense,
}: {
  head: ReactNode[];
  rows: ReactNode[][];
  dense?: boolean;
}) {
  return (
    <div className="card-elevated overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-2/70">
            {head.map((h, i) => (
              <th
                key={i}
                className="px-5 py-4 font-mono text-[10px] font-semibold tracking-[0.14em] whitespace-nowrap text-muted-foreground uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className="group border-b border-border/60 transition-colors last:border-0 hover:bg-signal/[0.05]"
            >
              {r.map((c, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-5 align-top",
                    dense ? "py-3" : "py-4",
                    j === 0
                      ? "relative font-semibold text-foreground before:absolute before:top-2 before:bottom-2 before:left-0 before:w-0.5 before:scale-y-0 before:rounded-full before:bg-[image:var(--gradient-signal)] before:transition-transform before:duration-300 group-hover:before:scale-y-100"
                      : "text-muted-foreground",
                  )}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FlowNode({
  title,
  sub,
  accent,
  className,
}: {
  title: string;
  sub?: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3.5 text-center transition-all duration-300 hover:-translate-y-0.5",
        accent
          ? "glow-node border-signal/50 bg-signal/10"
          : "border-border bg-surface shadow-[var(--shadow-lift)] hover:border-signal/40 hover:shadow-[var(--shadow-hover)]",
        className,
      )}
    >
      <div className="font-display text-sm font-semibold tracking-tight text-foreground">
        {title}
      </div>
      {sub ? <div className="mt-1 text-xs text-muted-foreground">{sub}</div> : null}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 rounded-r-md border-l-2 border-signal/40 bg-surface-2/60 py-2.5 pr-3 pl-4 text-xs leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

/**
 * Visual bridge that links a "what is broken" block to the JARA answer that
 * follows. Presentation only — it carries no new content.
 */
export function SolutionBridge({
  from,
  to,
  href,
}: {
  from: string;
  to: string;
  href: string;
}) {
  return (
    <Reveal>
      <a
        href={href}
        className="group mt-8 flex flex-col items-center gap-3 rounded-2xl border border-border/70 bg-surface/50 px-6 py-6 text-center transition-colors hover:border-signal/45 hover:bg-surface"
      >
        <span className="kicker text-muted-foreground">{from}</span>
        <span className="relative flex h-8 w-px justify-center bg-gradient-to-b from-signal/10 via-signal/60 to-signal">
          <span className="absolute -bottom-1 size-2 rotate-45 border-r border-b border-signal transition-transform duration-300 group-hover:translate-y-1" />
        </span>
        <span className="font-display text-base font-semibold tracking-tight text-foreground md:text-lg">
          {to}
        </span>
      </a>
    </Reveal>
  );
}
