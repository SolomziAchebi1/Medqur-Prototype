import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { MedPack } from "@/components/med-pack";
import { medications } from "@/lib/seed";

export const Route = createFileRoute("/formulary")({ component: FormularyPage });

function FormularyPage() {
  const lookalikes = medications.filter((m) => m.lookAlikeOf);
  return (
    <AppShell>
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        Kingston General Pharmacy
      </p>
      <h1 className="text-2xl font-semibold tracking-tight">Formulary</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Every pack on the trolley carries a DoseLock barcode. Look-alike pairs
        are stocked together on purpose in this demo — that is how they sit on a
        real ward.
      </p>

      {lookalikes.length ? (
        <div className="mt-6 rounded-xl bg-danger-soft p-4">
          <p className="text-sm font-semibold text-danger">High-alert look-alikes</p>
          <ul className="mt-2 grid gap-1 text-sm text-fg sm:grid-cols-2">
            {lookalikes.map((m) => (
              <li key={m.id}>
                {m.brand} {m.strength}{" "}
                <span className="font-mono text-muted">#{m.barcode}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {medications.map((med) => (
          <MedPack key={med.id} med={med} />
        ))}
      </div>
    </AppShell>
  );
}
