import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const sections: [string, string][] = [
  ["executive-summary", "Executive Summary"],
  ["problem", "The Problem"],
  ["opportunity", "Opportunity"],
  ["vision", "Product Vision"],
  ["journey", "Customer Journey"],
  ["architecture", "Architecture"],
  ["features", "Features"],
  ["menu", "Menu Engine"],
  ["locations", "Locations"],
  ["voice", "Voice"],
  ["manager", "Manager Dashboard"],
  ["corporate", "Corporate Dashboard"],
  ["financial", "Financial Model"],
  ["business-model", "Business Model"],
  ["competition", "Competition"],
  ["roadmap", "Roadmap"],
  ["risks", "Risks"],
  ["implementation", "Implementation"],
  ["investment", "Investment"],
  ["conclusion", "Conclusion"],
];

export function BlueprintNav() {
  const [active, setActive] = useState<string>("executive-summary");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100);
      let current = "executive-summary";
      for (const [id] of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 h-14 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="size-2.5 rounded-sm bg-signal" />
            <span className="font-display text-sm tracking-tight">JARA RestaurantOS</span>
            <span className="hidden font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase sm:inline">
              Blueprint
            </span>
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-md border border-border px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors hover:border-signal/50 xl:hidden"
          >
            {open ? "Close" : "Contents"}
          </button>
          <span className="hidden font-mono text-[10px] text-muted-foreground xl:inline">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-px w-full bg-border">
          <div className="h-px bg-signal transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-14 z-40 max-h-[70vh] overflow-y-auto border-b border-border bg-background/98 p-4 backdrop-blur xl:hidden">
          <ol className="grid gap-1 sm:grid-cols-2">
            {sections.map(([id, label], i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded px-2 py-2 text-sm",
                    active === id ? "bg-surface-2 text-foreground" : "text-muted-foreground",
                  )}
                >
                  <span className="font-mono text-[10px] text-signal">{String(i + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}

      <nav className="fixed top-1/2 left-6 z-40 hidden -translate-y-1/2 xl:block">
        <ol className="space-y-1">
          {sections.map(([id, label], i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "group flex items-center gap-2.5 py-0.5 text-[11px] transition-colors",
                  active === id ? "text-signal" : "text-muted-foreground/60 hover:text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "h-px transition-all",
                    active === id ? "w-5 bg-signal" : "w-2.5 bg-border group-hover:w-4",
                  )}
                />
                <span className="font-mono text-[9px]">{String(i + 1).padStart(2, "0")}</span>
                <span className="max-w-[130px] truncate">{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
