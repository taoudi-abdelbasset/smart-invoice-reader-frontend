import { useEffect, useState } from "react";
import { messageService } from "./messageService";
import type { Message } from "./types";

export function useMessages(sessionId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setMessages([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError("");

    messageService
      .list(sessionId)
      .then((data) => !cancelled && setMessages(data))
      .catch(() => !cancelled && setError("Could not load messages"))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const sendMessage = async (content: string) => {
    if (!sessionId) return;
    setSending(true);
    setError("");
    try {
      await messageService.send(sessionId, content);
      setMessages(await messageService.list(sessionId));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSending(false);
    }
  };

  return { messages, loading, sending, error, sendMessage };
}
