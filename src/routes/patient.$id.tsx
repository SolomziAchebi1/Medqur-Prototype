import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ScanLine } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Barcode } from "@/components/barcode";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { patientById, useAppStore } from "@/lib/store";
import { ageFromDob, jamaicaTime } from "@/lib/utils";
import type { OrderStatus } from "@/lib/types";

export const Route = createFileRoute("/patient/$id")({ component: PatientPage });

function PatientPage() {
  const { id } = Route.useParams();
  const patient = patientById(id);
  const orders = useAppStore((s) => s.orders).filter((o) => o.patientId === id);

  if (!patient) {
    return (
      <AppShell>
        <p>Patient not found.</p>
        <Link to="/ward" className="text-primary">
          Back to ward
        </Link>
      </AppShell>
    );
  }

  const allergic = patient.allergies.filter((a) => !a.toLowerCase().includes("none"));

  return (
    <AppShell>
      <Link
        to="/ward"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        Ward board
      </Link>

      <section className="mt-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-xs tracking-widest text-muted uppercase">
              {patient.bed} · {patient.ward}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {patient.name}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {patient.sex} · {ageFromDob(patient.dob)} years · DOB{" "}
              {patient.dob}
              {patient.weightKg ? ` · ${patient.weightKg} kg` : ""}
            </p>
            <p className="mt-2 text-sm">{patient.diagnosis}</p>
            <p className="mt-1 text-xs text-subtle">
              Consultant {patient.consultant} · MRN {patient.mrn}
            </p>
          </div>
          <div className="rounded-md bg-paper px-3 py-2">
            <p className="font-mono text-[10px] tracking-widest text-muted uppercase">
              Wristband
            </p>
            <Barcode value={patient.wristband} height={32} />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {allergic.length ? (
            allergic.map((a) => (
              <Badge key={a} variant="allergy">
                Allergy · {a}
              </Badge>
            ))
          ) : (
            <Badge>NKDA</Badge>
          )}
        </div>
      </section>

      <h2 className="mt-8 text-lg font-semibold">Medication orders</h2>
      <ul className="mt-3 grid gap-3">
        {orders.map((o) => (
          <li
            key={o.id}
            className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]"
          >
            <div className="flex min-w-0 flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-lg font-semibold">{o.displayName}</p>
                  <StatusBadge status={o.status} />
                </div>
                <p className="mt-1 font-mono text-sm tabular-nums">
                  {o.dose} · {o.route} · {o.frequency}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {o.prescribedBy}
                  {o.indication ? ` · ${o.indication}` : ""} · due{" "}
                  {jamaicaTime(new Date(o.dueAt))}
                </p>
              </div>
              {o.status === "given" ? (
                <Badge variant="given">Given</Badge>
              ) : (
                <Button asChild size="lg">
                  <Link
                    to="/scan/$patientId/$orderId"
                    params={{ patientId: patient.id, orderId: o.id }}
                  >
                    <ScanLine className="size-4" />
                    Scan to administer
                  </Link>
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  if (status === "overdue") return <Badge variant="overdue">Overdue</Badge>;
  if (status === "due") return <Badge variant="due">Due</Badge>;
  if (status === "given") return <Badge variant="given">Given</Badge>;
  if (status === "blocked") return <Badge variant="blocked">Held</Badge>;
  return <Badge>{status}</Badge>;
}
