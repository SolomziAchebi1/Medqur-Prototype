import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { patients } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { ageFromDob } from "@/lib/utils";

export const Route = createFileRoute("/ward")({ component: WardPage });

function WardPage() {
  const orders = useAppStore((s) => s.orders);
  const incidents = useAppStore((s) => s.incidents);
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return patients
      .map((p) => {
        const due = orders.filter(
          (o) =>
            o.patientId === p.id &&
            (o.status === "due" || o.status === "overdue"),
        );
        const overdue = due.filter((o) => o.status === "overdue").length;
        return { p, due: due.length, overdue };
      })
      .filter(({ p }) => {
        if (!query) return true;
        return (
          p.name.toLowerCase().includes(query) ||
          p.mrn.includes(query) ||
          p.bed.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => b.overdue - a.overdue || b.due - a.due);
  }, [orders, q]);

  const dueCount = orders.filter((o) => o.status === "due" || o.status === "overdue").length;
  const givenCount = orders.filter((o) => o.status === "given").length;
  const missCount = incidents.filter((i) => i.kind !== "administered" && i.kind !== "match").length;

  return (
    <AppShell>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            Kingston General · Medical 4B
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Ward board</h1>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-sm sm:mt-0">
          <Chip label="Due" value={dueCount} />
          <Chip label="Given" value={givenCount} />
          <Chip label="Near-miss" value={missCount} warn={missCount > 0} />
        </div>
      </div>

      <div className="relative mt-5">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, MRN, or bed"
          className="pl-10"
        />
      </div>

      <ul className="mt-4 grid gap-3">
        {rows.map(({ p, due, overdue }) => {
          const allergic = p.allergies.some((a) => !a.toLowerCase().includes("none"));
          return (
            <li key={p.id}>
              <Link
                to="/patient/$id"
                params={{ id: p.id }}
                className="flex items-center gap-3 rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] transition-[transform,background-color] duration-150 hover:bg-bg-warm active:scale-[0.99]"
              >
                <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-md bg-ink text-paper">
                  <span className="font-mono text-[10px] tracking-wide opacity-70">
                    BED
                  </span>
                  <span className="font-mono text-xs font-medium">{p.bed.replace("4B-", "")}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold">{p.name}</p>
                    {overdue > 0 ? <Badge variant="overdue">Overdue</Badge> : null}
                    {allergic ? (
                      <Badge variant="allergy">
                        <AlertTriangle className="mr-1 size-3" />
                        Allergy
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-0.5 truncate text-sm text-muted">
                    {p.sex} · {ageFromDob(p.dob)}y · MRN {p.mrn}
                  </p>
                  <p className="truncate text-xs text-subtle">{p.diagnosis}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="font-mono text-sm tabular-nums">{due} due</p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-subtle" />
              </Link>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}

function Chip({
  label,
  value,
  warn,
}: {
  label: string;
  value: number;
  warn?: boolean;
}) {
  return (
    <div
      className={
        warn
          ? "rounded-md bg-danger-soft px-3 py-1.5"
          : "rounded-md bg-surface px-3 py-1.5 shadow-[var(--shadow-border)]"
      }
    >
      <span className="text-muted">{label} </span>
      <span className="font-mono font-medium tabular-nums">{value}</span>
    </div>
  );
}
