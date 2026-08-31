import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  defaultSession,
  medications,
  patients,
  seedIncidents,
  seedOrders,
} from "./seed";
import type { Incident, Order, Session } from "./types";

type AppState = {
  session: Session;
  orders: Order[];
  incidents: Incident[];
  hydrated: boolean;
  setHydrated: (v: boolean) => void;
  setSession: (patch: Partial<Session>) => void;
  resetDemo: () => void;
  addOrder: (order: Order) => void;
  markGiven: (orderId: string) => void;
  markBlocked: (orderId: string) => void;
  logIncident: (incident: Omit<Incident, "id" | "at" | "nurse">) => void;
};

const fresh = () => ({
  session: { ...defaultSession },
  orders: seedOrders(),
  incidents: [...seedIncidents],
});

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...fresh(),
      hydrated: false,
      setHydrated: (v) => set({ hydrated: v }),
      setSession: (patch) => set({ session: { ...get().session, ...patch } }),
      resetDemo: () => set({ ...fresh() }),
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
      markGiven: (orderId) =>
        set({
          orders: get().orders.map((o) =>
            o.id === orderId ? { ...o, status: "given" as const } : o,
          ),
        }),
      markBlocked: (orderId) =>
        set({
          orders: get().orders.map((o) =>
            o.id === orderId ? { ...o, status: "blocked" as const } : o,
          ),
        }),
      logIncident: (incident) => {
        const row: Incident = {
          ...incident,
          id: `i-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          at: new Date().toISOString(),
          nurse: get().session.nurse,
        };
        set({ incidents: [row, ...get().incidents] });
      },
    }),
    {
      name: "doselock-kgh-v1",
      skipHydration: true,
      partialize: (s) => ({
        session: s.session,
        orders: s.orders,
        incidents: s.incidents,
      }),
    },
  ),
);

export function useMedications() {
  return medications;
}

export function usePatients() {
  return patients;
}

export function patientById(id: string) {
  return patients.find((p) => p.id === id);
}

export function medById(id: string) {
  return medications.find((m) => m.id === id);
}
