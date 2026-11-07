import http from "../../tools/http";
import type { Conversation } from "./types";

export const conversationService = {
  getAll: () => http<Conversation[]>("conversations/"),
  create: (title: string) =>
    http<Conversation>("conversations/", {
      method: "POST",
      body: JSON.stringify({ title }),
    }),

  remove: (id: string) =>
    http<void>(`conversations/${id}`, { method: "DELETE" }),
};
