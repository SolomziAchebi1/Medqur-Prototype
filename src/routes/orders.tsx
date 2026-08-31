import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { medications, patients } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import type { Order } from "@/lib/types";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

function OrdersPage() {
  const addOrder = useAppStore((s) => s.addOrder);
  const navigate = useNavigate();
  const [patientId, setPatientId] = useState(patients[0]?.id ?? "");
  const [medicationId, setMedicationId] = useState(medications[0]?.id ?? "");
  const [dose, setDose] = useState("5 mg");
  const [route, setRoute] = useState("PO");
  const [frequency, setFrequency] = useState("once daily");

  const med = medications.find((m) => m.id === medicationId);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!med) return;
    const order: Order = {
      id: `o-new-${Date.now()}`,
      patientId,
      medicationId: med.id,
      generic: med.generic,
      displayName: med.brand,
      dose,
      doseMg: med.strengthMg,
      route,
      frequency,
      dueAt: new Date().toISOString(),
      status: "due",
      prescribedBy: "Dr A. Grant",
    };
    addOrder(order);
    void navigate({ to: "/patient/$id", params: { id: patientId } });
  }

  return (
    <AppShell>
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        Prescriber
      </p>
      <h1 className="text-2xl font-semibold tracking-tight">Write an order</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Add a chart line, then open the patient and scan. Use this to stage a
        mismatch for a sales walkthrough.
      </p>

      <form
        onSubmit={submit}
        className="mt-6 max-w-lg space-y-4 rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]"
      >
        <div className="space-y-1.5">
          <Label htmlFor="patient">Patient</Label>
          <select
            id="patient"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="flex h-11 w-full rounded-md border border-border-strong bg-surface px-3 text-sm"
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.bed} · {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="med">Medicine</Label>
          <select
            id="med"
            value={medicationId}
            onChange={(e) => {
              const next = medications.find((m) => m.id === e.target.value);
              setMedicationId(e.target.value);
              if (next) {
                setDose(next.strength);
                setRoute(next.route);
              }
            }}
            className="flex h-11 w-full rounded-md border border-border-strong bg-surface px-3 text-sm"
          >
            {medications.map((m) => (
              <option key={m.id} value={m.id}>
                {m.brand} {m.strength} ({m.form})
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="dose">Dose</Label>
            <Input id="dose" value={dose} onChange={(e) => setDose(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="route">Route</Label>
            <Input id="route" value={route} onChange={(e) => setRoute(e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="freq">Frequency</Label>
          <Input
            id="freq"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Sign order
        </Button>
      </form>
    </AppShell>
  );
}
