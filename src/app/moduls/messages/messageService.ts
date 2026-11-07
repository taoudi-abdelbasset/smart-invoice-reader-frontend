import http from "../../tools/http";
import type { Message } from "./types";

export const messageService = {
  async list(sessionId: string) {
    const messages = await http<Message[]>(`messages/${sessionId}`);
    return messages.sort((a, b) => a.created_at.localeCompare(b.created_at));
  },

  send: (sessionId: string, content: string) =>
    http<Message>(`messages/${sessionId}/new`, {
      method: "POST",
      body: JSON.stringify({ content }),
    }),
};
