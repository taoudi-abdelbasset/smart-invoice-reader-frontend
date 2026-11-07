import { useEffect, useState } from "react";
import { conversationService } from "./conversationService";
import type { Conversation } from "./types";

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    conversationService
      .getAll()
      .then(setConversations)
      .catch(() => setError("Could not load conversations"))
      .finally(() => setLoading(false));
  }, []);

  const createConversation = async (title: string) => {
    try {
      const created = await conversationService.create(title);
      setConversations((prev) => [...prev, created]);
      setActiveSessionId(created.session_id);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const deleteConversation = async (sessionId: string) => {
    try {
      await conversationService.remove(sessionId);
      setConversations((prev) => prev.filter((c) => c.session_id !== sessionId));
      setActiveSessionId((current) => (current === sessionId ? null : current));
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const activeConversation =
    conversations.find((c) => c.session_id === activeSessionId) ?? null;

  return {
    conversations,
    activeSessionId,
    activeConversation,
    loading,
    error,
    selectConversation: setActiveSessionId,
    createConversation,
    deleteConversation,
  };
}