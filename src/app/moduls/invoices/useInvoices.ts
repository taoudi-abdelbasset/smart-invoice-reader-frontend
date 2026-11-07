import { useCallback, useEffect, useState } from "react";
import { invoiceService } from "./invoiceService";
import type { Invoice } from "./types";

export function useInvoices(sessionId: string | null) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setInvoices([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError("");

    invoiceService
      .listBySession(sessionId)
      .then((data) => !cancelled && setInvoices(data))
      .catch(() => !cancelled && setError("Could not load invoices"))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const reload = useCallback(async () => {
    if (!sessionId) return;
    try {
      setInvoices(await invoiceService.listBySession(sessionId));
    } catch {
      setError("Could not load invoices");
    }
  }, [sessionId]);

  return { invoices, loading, error, reload };
}