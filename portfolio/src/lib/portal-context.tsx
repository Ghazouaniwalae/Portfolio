"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { PortalId } from "@/data/projects";

interface PortalState {
  active: PortalId | null;
  select: (id: PortalId) => void;
  clear: () => void;
}

const PortalContext = createContext<PortalState | null>(null);
const VALID: PortalId[] = ["build", "extract", "predict"];

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<PortalId | null>(null);

  // hydrate from URL hash on mount
  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "") as PortalId;
    if (VALID.includes(fromHash)) setActive(fromHash);
  }, []);

  const select = useCallback((id: PortalId) => {
    setActive(id);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
  }, []);

  const clear = useCallback(() => {
    setActive(null);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <PortalContext.Provider value={{ active, select, clear }}>
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal(): PortalState {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used within PortalProvider");
  return ctx;
}
