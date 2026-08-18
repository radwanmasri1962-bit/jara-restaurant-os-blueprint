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
        "scroll-mt-20 border-t border-border/70 px-5 py-20 sm:px-8 md:py-28",
        alt && "bg-surface/40",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <header className="mb-12 max-w-3xl md:mb-16">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-signal">
                {String(index).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-border" />
              <Kicker>{kicker}</Kicker>
            </div>
            <h2 className="mt-5 text-3xl leading-[1.08] text-balance md:text-5xl">{title}</h2>
            {lede ? (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
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
    <div className={cn("card-elevated p-5 md:p-6", className)}>
      {(title || eyebrow || action) && (
        <div className="mb-5 flex items-start justify-between gap-4">
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
  verified: "border-verified/40 text-verified bg-verified/10",
  assumption: "border-assumption/40 text-assumption bg-assumption/10",
  illustrative: "border-illustrative/40 text-illustrative bg-illustrative/10",
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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase",
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
    <div className="card-elevated p-5">
      <div className="font-display text-3xl leading-none text-foreground md:text-4xl">{value}</div>
      <div className="mt-3 text-sm font-medium text-foreground/90">{label}</div>
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
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-signal/70" />
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
          <tr className="border-b border-border">
            {head.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 font-mono text-[10px] tracking-[0.16em] whitespace-nowrap text-muted-foreground uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-surface-2/60">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-4 align-top",
                    dense ? "py-2.5" : "py-3.5",
                    j === 0 ? "font-medium text-foreground" : "text-muted-foreground",
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
        "rounded-md border px-4 py-3 text-center transition-colors",
        accent
          ? "border-signal/50 bg-signal/10"
          : "border-border bg-surface-2/70 hover:border-signal/40",
        className,
      )}
    >
      <div className="text-sm font-semibold text-foreground">{title}</div>
      {sub ? <div className="mt-1 text-xs text-muted-foreground">{sub}</div> : null}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 border-l-2 border-border pl-4 text-xs leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}
