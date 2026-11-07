import http from "../../tools/http";
import type { Invoice } from "./types";

export const invoiceService = {
  listAll: () => http<Invoice[]>("invoice/"),

  listBySession: (sessionId: string) =>
    http<Invoice[]>(`invoice/session/${sessionId}`),

  get: (id: string) => http<Invoice>(`invoice/${id}`),
};
