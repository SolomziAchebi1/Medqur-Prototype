import { useEffect } from "react";
import { useAppStore } from "@/lib/store";

export function HydrateStore() {
  const setHydrated = useAppStore((s) => s.setHydrated);
  useEffect(() => {
    void Promise.resolve(useAppStore.persist.rehydrate()).finally(() =>
      setHydrated(true),
    );
  }, [setHydrated]);
  return null;
}
