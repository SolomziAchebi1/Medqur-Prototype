import { cn } from "@/lib/utils";

export function DoseLockMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M11 14.5V11.2a5 5 0 0 1 10 0v3.3"
        fill="none"
        stroke="#f4f1ea"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="8" y="14.5" width="16" height="12.5" rx="2.5" fill="#0f6e68" />
      <rect x="10.2" y="17.2" width="1.5" height="7" rx="0.4" fill="#f4f1ea" />
      <rect x="13.2" y="17.2" width="1.5" height="7" rx="0.4" fill="#f4f1ea" />
      <rect x="16.2" y="17.2" width="1.5" height="7" rx="0.4" fill="#f4f1ea" />
      <rect x="19.2" y="17.2" width="2.4" height="7" rx="0.4" fill="#f4f1ea" />
    </svg>
  );
}

export function Wordmark({
  inverted = false,
  className,
}: {
  inverted?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <DoseLockMark className={inverted ? "text-paper" : "text-ink"} />
      <span
        className={cn(
          "font-semibold tracking-tight",
          inverted ? "text-paper" : "text-ink",
        )}
      >
        DoseLock
      </span>
    </span>
  );
}
