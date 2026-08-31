import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ClipboardList, Pill, RotateCcw, ShieldAlert, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { cn, jamaicaNow } from "@/lib/utils";

const NAV = [
  { to: "/ward", label: "Ward", icon: Users },
  { to: "/formulary", label: "Formulary", icon: Pill },
  { to: "/orders", label: "Orders", icon: ClipboardList },
  { to: "/incidents", label: "Near-misses", icon: ShieldAlert },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const session = useAppStore((s) => s.session);
  const resetDemo = useAppStore((s) => s.resetDemo);
  const [clock, setClock] = useState("");

  useEffect(() => {
    setClock(jamaicaNow());
    const id = window.setInterval(() => setClock(jamaicaNow()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-bg text-fg">
      <header className="sticky top-0 z-30 overflow-x-hidden border-b border-ink-3 bg-ink text-paper">
        <div className="mx-auto flex min-w-0 max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/" className="shrink-0">
            <Wordmark inverted />
          </Link>
          <div className="hidden min-w-0 flex-1 sm:block">
            <p className="truncate text-xs text-paper/70">{session.hospital}</p>
            <p className="truncate text-sm font-medium">{session.ward}</p>
          </div>
          <div className="ml-auto min-w-0 text-right">
            <p className="font-mono text-xs tabular-nums text-paper/70">{clock}</p>
            <p className="truncate text-sm">
              {session.nurse}
              <span className="text-paper/60"> · {session.role}</span>
            </p>
          </div>
        </div>
        <nav className="mx-auto flex w-full min-w-0 max-w-6xl gap-1 overflow-x-auto px-3 pb-2">
          {NAV.map((item) => {
            const active =
              item.to === "/ward"
                ? pathname === "/ward" ||
                  pathname.startsWith("/patient") ||
                  pathname.startsWith("/scan")
                : pathname === item.to || pathname.startsWith(`${item.to}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors duration-150",
                  active
                    ? "bg-ink-3 text-paper"
                    : "text-paper/70 hover:bg-ink-2 hover:text-paper",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-11 shrink-0 text-paper/70 hover:bg-ink-2 hover:text-paper"
            onClick={() => resetDemo()}
          >
            <RotateCcw className="size-4" />
            <span className="hidden sm:inline">Reset demo</span>
            <span className="sm:hidden">Reset</span>
          </Button>
        </nav>
      </header>
      <main className="mx-auto min-w-0 max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
