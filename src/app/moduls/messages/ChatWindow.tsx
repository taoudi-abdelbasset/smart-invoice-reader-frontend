import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import type { Message } from "./types";

type Props = {
  messages: Message[];
  sending: boolean;
  onSend: (content: string) => Promise<void>;
};

function parseError(content: string): string | null {
  try {
    const obj = JSON.parse(content);
    if (obj?.error) return obj.error.message ?? "Unknown error";
  } catch {
    /* not JSON */
  }
  return null;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

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
      <div className="flex-grow-1 overflow-auto bg-light border rounded p-3 mb-2 d-flex flex-column gap-3">
        {messages.length === 0 && (
          <div className="m-auto text-muted text-center">
            <div className="fs-1">💬</div>
            Say hello or upload an invoice to start
          </div>
        )}

        {messages.map((m) => {
          const isUser = m.role === "user";
          const errorMessage = isUser ? null : parseError(m.content);

          return (
            <div
              key={m.id}
              className={`d-flex gap-2 ${isUser ? "justify-content-end" : "justify-content-start"}`}
            >
              {!isUser && (
                <div
                  className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center flex-shrink-0"
                  style={{ width: 32, height: 32, fontSize: 12 }}
                >
                  AI
                </div>
              )}

              <div style={{ maxWidth: "75%" }}>
                {errorMessage ? (
                  <div className="alert alert-warning py-2 px-3 mb-1 small">
                    <strong>⚠ Agent error:</strong> {errorMessage}
                  </div>
                ) : (
                  <div
                    className={`px-3 py-2 shadow-sm ${
                      isUser
                        ? "bg-primary text-white rounded-4 rounded-top-end-0"
                        : "bg-white border rounded-4 rounded-top-start-0"
                    }`}
                    style={{ wordBreak: "break-word" }}
                  >
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2">{children}</p>,
                        ul: ({ children }) => (
                          <ul className="mb-2 ps-3">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-2 ps-3">{children}</ol>
                        ),
                        code: ({ children }) => (
                          <code className="bg-light text-dark px-1 rounded">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  </div>
                )}

                <div
                  className={`text-muted mt-1 ${isUser ? "text-end" : "text-start"}`}
                  style={{ fontSize: 11 }}
                >
                  {formatTime(m.created_at)}
                </div>
              </div>
            </div>
          );
        })}

        {sending && (
          <div className="d-flex gap-2">
            <div
              className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: 32, height: 32, fontSize: 12 }}
            >
              AI
            </div>
            <div className="bg-white border rounded-4 px-3 py-2 shadow-sm text-muted">
              <span className="spinner-grow spinner-grow-sm me-1" />
              <span className="spinner-grow spinner-grow-sm me-1" />
              <span className="spinner-grow spinner-grow-sm" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <form className="d-flex gap-2" onSubmit={handleSubmit}>
        <input
          className="form-control"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          disabled={sending}
        />
        <button
          className="btn btn-primary px-4"
          type="submit"
          disabled={sending || !text.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
