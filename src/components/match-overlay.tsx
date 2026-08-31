import { Check } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { playMatchChime, stopAlarm } from "@/lib/audio";
import type { VerifyResult } from "@/lib/types";

export function MatchOverlay({
  result,
  onGive,
  onCancel,
}: {
  result: VerifyResult;
  onGive: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    playMatchChime();
    return () => stopAlarm();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="match-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-success-deep/80 p-4"
    >
      <div className="match-in w-full max-w-lg rounded-xl bg-success-fg p-6 text-fg shadow-2xl sm:p-8">
        <div className="flex items-center gap-3 text-success">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-success text-success-fg">
            <Check className="size-8" strokeWidth={2.6} />
          </span>
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-success">
              DOSELOCK · MATCH
            </p>
            <h2
              id="match-title"
              className="text-3xl font-semibold tracking-tight text-success-deep sm:text-4xl"
            >
              {result.title}
            </h2>
          </div>
        </div>
        <p className="mt-4 text-lg font-medium text-ink">{result.headline}</p>
        <p className="mt-2 text-sm text-muted">{result.detail}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-success-soft p-3">
            <dt className="text-xs text-muted">Patient</dt>
            <dd className="font-semibold">{result.patient.name}</dd>
            <dd className="font-mono text-xs">{result.patient.mrn}</dd>
          </div>
          <div className="rounded-lg bg-success-soft p-3">
            <dt className="text-xs text-muted">Dose</dt>
            <dd className="font-semibold">
              {result.order.dose} {result.order.route}
            </dd>
            <dd className="text-xs">{result.order.frequency}</dd>
          </div>
        </dl>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button variant="success" size="xl" className="flex-1" onClick={onGive}>
            Record as given
          </Button>
          <Button variant="outline" size="xl" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
