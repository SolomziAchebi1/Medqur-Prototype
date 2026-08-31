import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { cn } from "@/lib/utils";

export function Barcode({
  value,
  className,
  lineColor = "#12202b",
  height = 42,
}: {
  value: string;
  className?: string;
  lineColor?: string;
  height?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current || !value) return;
    try {
      JsBarcode(ref.current, value, {
        format: "CODE128",
        displayValue: true,
        font: "IBM Plex Mono, ui-monospace, monospace",
        fontSize: 12,
        height,
        margin: 0,
        lineColor,
        background: "transparent",
        width: 1.6,
      });
    } catch {
      /* invalid value */
    }
  }, [value, lineColor, height]);

  return (
    <svg
      ref={ref}
      className={cn("max-w-full", className)}
      role="img"
      aria-label={`Barcode ${value}`}
    />
  );
}
