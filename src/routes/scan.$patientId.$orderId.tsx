import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { MatchOverlay } from "@/components/match-overlay";
import { Scanner } from "@/components/scanner";
import { WarningOverlay } from "@/components/warning-overlay";
import { playClick } from "@/lib/audio";
import { patientById, useAppStore } from "@/lib/store";
import { isAlarm, verifyScan } from "@/lib/verify";
import type { VerifyResult } from "@/lib/types";
import { ageFromDob } from "@/lib/utils";

export const Route = createFileRoute("/scan/$patientId/$orderId")({
  component: ScanPage,
});

function ScanPage() {
  const { patientId, orderId } = Route.useParams();
  const navigate = useNavigate();
  const patient = patientById(patientId);
  const orders = useAppStore((s) => s.orders);
  const order = orders.find((o) => o.id === orderId);
  const logIncident = useAppStore((s) => s.logIncident);
  const markGiven = useAppStore((s) => s.markGiven);
  const markBlocked = useAppStore((s) => s.markBlocked);

  const [result, setResult] = useState<VerifyResult | null>(null);
  const lock = useRef(false);

  const allergic = useMemo(
    () =>
      patient?.allergies.filter((a) => !a.toLowerCase().includes("none")) ?? [],
    [patient],
  );

  const handleScan = useCallback(
    (barcode: string) => {
      if (!patient || !order || lock.current) return;
      lock.current = true;
      playClick();
      const next = verifyScan(patient, order, barcode);
      setResult(next);
      if (isAlarm(next.kind)) {
        logIncident({
          kind: next.kind,
          patientId: patient.id,
          orderId: order.id,
          scannedBarcode: barcode,
          scannedLabel: next.scanned
            ? `${next.scanned.brand} ${next.scanned.strength}`
            : barcode,
          prescribedLabel: `${order.displayName} ${order.dose}`,
          detail: next.headline,
        });
        markBlocked(order.id);
      }
    },
    [patient, order, logIncident, markBlocked],
  );

  if (!patient || !order) {
    return (
      <AppShell>
        <p>Order not found.</p>
        <Link to="/ward" className="text-primary">
          Back to ward
        </Link>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Link
        to="/patient/$id"
        params={{ id: patient.id }}
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        {patient.name}
      </Link>

      <section className="mt-4 rounded-xl bg-ink p-5 text-paper">
        <p className="font-mono text-[10px] tracking-[0.2em] text-paper/60 uppercase">
          Five rights check · {patient.bed}
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          {patient.name}
        </h1>
        <p className="mt-1 text-sm text-paper/70">
          {patient.sex} · {ageFromDob(patient.dob)}y · MRN {patient.mrn}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {allergic.length ? (
            allergic.map((a) => (
              <Badge key={a} variant="blocked">
                Allergy · {a}
              </Badge>
            ))
          ) : (
            <Badge variant="paper">NKDA</Badge>
          )}
        </div>
        <div className="mt-5 rounded-lg bg-ink-3 p-4">
          <p className="font-mono text-[10px] tracking-widest text-paper/50 uppercase">
            Administer
          </p>
          <p className="mt-1 text-xl font-semibold">
            {order.displayName}{" "}
            <span className="font-mono">{order.dose}</span>
          </p>
          <p className="text-sm text-paper/70">
            {order.route} · {order.frequency} · {order.prescribedBy}
          </p>
        </div>
      </section>

      <h2 className="mt-8 text-lg font-semibold">Scan the pack</h2>
      <p className="mt-1 text-sm text-muted">
        Camera if you have one. Otherwise tap a pack on the trolley — that is
        the same check.
      </p>
      <div className="mt-4">
        <Scanner order={order} onScan={handleScan} />
      </div>

      {result && isAlarm(result.kind) ? (
        <WarningOverlay
          result={result}
          onAcknowledge={() => {
            lock.current = false;
            setResult(null);
            void navigate({
              to: "/incidents",
            });
          }}
          onOverride={() => {
            logIncident({
              kind: "override",
              patientId: patient.id,
              orderId: order.id,
              scannedBarcode: result.scanned?.barcode ?? "",
              scannedLabel: result.scanned
                ? `${result.scanned.brand} ${result.scanned.strength}`
                : "unknown",
              prescribedLabel: `${order.displayName} ${order.dose}`,
              detail: "Nurse overrode a hard stop. Dose was not auto-recorded.",
            });
            lock.current = false;
            setResult(null);
          }}
        />
      ) : null}

      {result && result.kind === "match" ? (
        <MatchOverlay
          result={result}
          onCancel={() => {
            lock.current = false;
            setResult(null);
          }}
          onGive={() => {
            markGiven(order.id);
            logIncident({
              kind: "administered",
              patientId: patient.id,
              orderId: order.id,
              scannedBarcode: result.scanned?.barcode ?? "",
              scannedLabel: result.scanned
                ? `${result.scanned.brand} ${result.scanned.strength}`
                : "",
              prescribedLabel: `${order.displayName} ${order.dose}`,
              detail: "Verified match. Dose recorded as given.",
            });
            void navigate({ to: "/patient/$id", params: { id: patient.id } });
          }}
        />
      ) : null}
    </AppShell>
  );
}
