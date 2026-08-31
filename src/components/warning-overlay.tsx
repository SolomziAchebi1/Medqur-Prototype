import { ShieldAlert, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { startMismatchAlarm, stopAlarm } from "@/lib/audio";
import type { VerifyResult } from "@/lib/types";

export function WarningOverlay({
  result,
  onAcknowledge,
  onOverride,
}: {
  result: VerifyResult;
  onAcknowledge: () => void;
  onOverride?: () => void;
}) {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    startMismatchAlarm();
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([200, 80, 200, 80, 400]);
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      stopAlarm();
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (muted) stopAlarm();
    else startMismatchAlarm();
  }, [muted]);

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alarm-title"
      className="alarm-flash fixed inset-0 z-50 flex items-stretch justify-center overflow-y-auto p-3 sm:p-6"
    >
      <div className="match-in my-auto flex w-full max-w-2xl flex-col rounded-xl bg-danger-fg p-4 text-fg shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 text-danger">
            <span className="alarm-ring inline-flex size-14 items-center justify-center rounded-full bg-danger text-danger-fg">
              <ShieldAlert className="size-8" strokeWidth={2.4} />
            </span>
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-danger">
                DOSELOCK · HARD STOP
              </p>
              <h2
                id="alarm-title"
                className="text-3xl font-semibold tracking-tight text-danger sm:text-5xl"
              >
                {result.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="inline-flex size-11 items-center justify-center rounded-md text-danger hover:bg-danger-soft"
            aria-label={muted ? "Unmute alarm" : "Mute alarm"}
          >
            {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          </button>
        </div>

        <p className="mt-4 text-lg font-medium leading-snug text-ink sm:text-2xl">
          {result.headline}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-fg sm:text-base">
          {result.detail}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-success-soft p-4">
            <p className="font-mono text-[10px] tracking-widest text-success uppercase">
              Ordered
            </p>
            <p className="mt-1 text-lg font-semibold text-success-deep">
              {result.order.displayName}
            </p>
            <p className="font-mono text-sm tabular-nums">
              {result.order.dose} · {result.order.route}
            </p>
            <p className="mt-1 text-xs text-muted">{result.order.prescribedBy}</p>
          </div>
          <div className="rounded-lg bg-danger-soft p-4">
            <p className="font-mono text-[10px] tracking-widest text-danger uppercase">
              Scanned
            </p>
            <p className="mt-1 text-lg font-semibold text-danger-deep">
              {result.scanned?.brand ?? "Unknown pack"}
            </p>
            <p className="font-mono text-sm tabular-nums">
              {result.scanned
                ? `${result.scanned.strength} · ${result.scanned.form}`
                : result.detail.slice(0, 48)}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">
              {result.scanned?.barcode ?? "—"}
            </p>
          </div>
        </div>

        <p className="mt-5 rounded-md bg-ink px-3 py-2 text-center text-sm font-semibold tracking-wide text-paper uppercase">
          Do not administer
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Button
            variant="danger"
            size="xl"
            className="flex-1"
            onClick={onAcknowledge}
          >
            <X className="size-5" />
            Acknowledge and hold dose
          </Button>
          {onOverride ? (
            <Button variant="outline" size="xl" onClick={onOverride}>
              Override (logged)
            </Button>
          ) : null}
        </div>
        <p className="mt-3 text-center text-xs text-muted">
          Near-miss is written to the incident register for {result.patient.name}.
        </p>
      </div>
    </div>
  );
}
