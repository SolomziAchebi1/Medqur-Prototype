import { Camera, Keyboard, LayoutGrid } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MedPack } from "@/components/med-pack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { medications, trolleyForOrder } from "@/lib/seed";
import type { Medication, Order } from "@/lib/types";
import { cn } from "@/lib/utils";

type Mode = "trolley" | "camera" | "keypad";

type Detector = {
  detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue: string }>>;
};

export function Scanner({
  order,
  onScan,
}: {
  order: Order;
  onScan: (barcode: string) => void;
}) {
  const [mode, setMode] = useState<Mode>("trolley");
  const packs = trolleyForOrder(order)
    .map((id) => medications.find((m) => m.id === id))
    .filter((m): m is Medication => Boolean(m));

  return (
    <div>
      <div className="flex rounded-lg bg-bg-warm p-1">
        {(
          [
            ["trolley", LayoutGrid, "Trolley"],
            ["camera", Camera, "Camera"],
            ["keypad", Keyboard, "Keypad"],
          ] as const
        ).map(([id, Icon, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            className={cn(
              "flex h-11 flex-1 items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors duration-150",
              mode === id ? "bg-surface text-ink shadow-sm" : "text-muted",
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      {mode === "trolley" ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {packs.map((med) => (
            <MedPack key={med.id} med={med} onScan={onScan} />
          ))}
        </div>
      ) : null}

      {mode === "camera" ? <CameraScan onScan={onScan} /> : null}

      {mode === "keypad" ? <KeypadScan onScan={onScan} /> : null}
    </div>
  );
}

function KeypadScan({ onScan }: { onScan: (barcode: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onScan(value.trim());
      }}
    >
      <Label htmlFor="barcode">Pack barcode</Label>
      <Input
        id="barcode"
        inputMode="numeric"
        autoComplete="off"
        placeholder="e.g. 10041"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="font-mono text-lg tracking-widest"
      />
      <Button type="submit" size="lg" className="w-full">
        Check pack
      </Button>
    </form>
  );
}

function CameraScan({ onScan }: { onScan: (barcode: string) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let raf = 0;
    let detector: Detector | null = null;
    let dead = false;

    async function start() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setError("Camera is not available in this browser. Use the trolley or keypad.");
          return;
        }
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (dead) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await video.play();
        setLive(true);

        const BD = (
          window as unknown as {
            BarcodeDetector?: new (opts: { formats: string[] }) => Detector;
          }
        ).BarcodeDetector;
        if (BD) {
          detector = new BD({
            formats: ["code_128", "ean_13", "code_39", "qr_code"],
          });
        }

        const tick = async () => {
          if (dead) return;
          if (detector && video.readyState >= 2) {
            try {
              const codes = await detector.detect(video);
              const value = codes[0]?.rawValue;
              if (value) {
                onScan(value);
                return;
              }
            } catch {
              /* frame skipped */
            }
          }
          raf = requestAnimationFrame(() => void tick());
        };
        raf = requestAnimationFrame(() => void tick());
      } catch {
        setError(
          "Camera permission was denied or is blocked in this preview. Use the trolley — tap a pack to scan it.",
        );
      }
    }

    void start();
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [onScan]);

  return (
    <div className="mt-4">
      <div className="relative overflow-hidden rounded-xl bg-ink">
        <video
          ref={videoRef}
          className="h-52 w-full object-cover"
          playsInline
          muted
        />
        {live ? (
          <div className="pointer-events-none absolute inset-x-8 top-8 h-px bg-primary scan-line" />
        ) : null}
        {!live && !error ? (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-paper">
            Opening camera…
          </p>
        ) : null}
      </div>
      {error ? (
        <p className="mt-3 rounded-md bg-warn-soft px-3 py-2 text-sm text-warn">
          {error}
        </p>
      ) : (
        <p className="mt-3 text-sm text-muted">
          Hold the pack barcode inside the frame. If the camera cannot see it, switch to Trolley.
        </p>
      )}
    </div>
  );
}
