import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Message } from "./types";

type Props = {
  messages: Message[];
  sending: boolean;
  onSend: (content: string) => Promise<void>;
};

export default function ChatWindow({ messages, sending, onSend }: Props) {
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim() || sending) return;
    const content = text;
    setText("");
    await onSend(content);
  }

  return (
    <div className="d-flex flex-column flex-grow-1" style={{ minHeight: 0 }}>
      <div className="flex-grow-1 overflow-auto border rounded p-2 mb-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={m.role === "user" ? "text-end" : "text-start"}
          >
            <span
              className={`d-inline-block rounded px-2 py-1 mb-1 ${m.role === "user" ? "bg-primary text-white" : "bg-light"}`}
            >
              {m.content}
            </span>
          </div>
        ))}
        {sending && <div className="text-muted">Thinking...</div>}
        <div ref={bottomRef} />
      </div>

      <form className="d-flex gap-2" onSubmit={handleSubmit}>
        <input
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
        />
        <button className="btn btn-primary" type="submit" disabled={sending}>
          Send
        </button>
      </form>
    </div>
  );
}