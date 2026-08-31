import { Barcode } from "@/components/barcode";
import { Badge } from "@/components/ui/badge";
import type { Medication } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MedPack({
  med,
  onScan,
  highlight,
}: {
  med: Medication;
  onScan?: (barcode: string) => void;
  highlight?: boolean;
}) {
  const clickable = Boolean(onScan);
  const Comp = clickable ? "button" : "div";

  return (
    <Comp
      type={clickable ? "button" : undefined}
      onClick={clickable ? () => onScan?.(med.barcode) : undefined}
      className={cn(
        "flex w-full flex-col rounded-xl bg-surface p-3 text-left shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-150",
        clickable && "hover:bg-bg-warm active:scale-[0.98]",
        highlight && "ring-2 ring-primary",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[10px] tracking-widest text-muted uppercase">
            KGH Pharmacy
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-fg">
            {med.brand}
          </p>
          <p className="font-mono text-sm tabular-nums text-ink">
            {med.strength}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          {med.controlled ? <Badge variant="cd">CD</Badge> : null}
          <Badge variant="default">{med.form}</Badge>
        </div>
      </div>
      <p className="mt-1 text-xs text-muted">
        {med.generic} · {med.route}
      </p>
      <div className="mt-3 rounded-md bg-paper px-2 py-2">
        <Barcode value={med.barcode} height={36} />
      </div>
      {clickable ? (
        <p className="mt-2 text-center text-xs font-medium text-primary">
          Tap pack to scan
        </p>
      ) : null}
    </Comp>
  );
}
