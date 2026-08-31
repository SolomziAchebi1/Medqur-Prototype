import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { patients } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { jamaicaNow } from "@/lib/utils";
import type { Incident } from "@/lib/types";

export const Route = createFileRoute("/incidents")({ component: IncidentsPage });

function IncidentsPage() {
  const incidents = useAppStore((s) => s.incidents);
  const misses = incidents.filter((i) => i.kind !== "administered");

  return (
    <AppShell>
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        Quality · Medical 4B
      </p>
      <h1 className="text-2xl font-semibold tracking-tight">Near-miss register</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Every hard stop is written here with the ordered pack, the scanned pack,
        and the nurse on the shift. This is the report a matron takes to the
        Monday meeting.
      </p>

      {misses.length === 0 ? (
        <div className="mt-8 rounded-xl bg-surface p-8 text-center shadow-[var(--shadow-border)]">
          <p className="font-medium">No near-misses yet this shift.</p>
          <p className="mt-2 text-sm text-muted">
            Open Devon Reid and scan hydromorphone against morphine to plant the
            first one.
          </p>
          <Link
            to="/scan/$patientId/$orderId"
            params={{ patientId: "p-devon", orderId: "o-devon-morphine" }}
            className="mt-4 inline-flex h-11 items-center text-sm font-medium text-primary"
          >
            Run the hydromorphone trap
          </Link>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3">
          {misses.map((row) => (
            <IncidentRow key={row.id} row={row} />
          ))}
        </ul>
      )}
    </AppShell>
  );
}

function IncidentRow({ row }: { row: Incident }) {
  const patient = patients.find((p) => p.id === row.patientId);
  const tone =
    row.kind === "override"
      ? "blocked"
      : row.kind === "match"
        ? "given"
        : "overdue";
  return (
    <li className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge variant={tone}>{row.kind.replace("-", " ")}</Badge>
        <p className="font-mono text-xs tabular-nums text-muted">
          {jamaicaNow(new Date(row.at))}
        </p>
      </div>
      <p className="mt-2 font-semibold">{patient?.name ?? row.patientId}</p>
      <p className="mt-1 text-sm">{row.detail}</p>
      <p className="mt-2 font-mono text-xs text-muted">
        Ordered {row.prescribedLabel} · scanned {row.scannedLabel} · {row.nurse}
      </p>
    </li>
  );
}
