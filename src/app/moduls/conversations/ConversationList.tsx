import { useState, type FormEvent } from "react";
import type { Conversation } from "./types";

type Props = {
  conversations: Conversation[];
  activeSessionId: string | null;
  onSelect: (session_id: string) => void;
  onCreate: (conversation_title: string) => void;
  onDelete: (session_id: string) => void;
};

export default function ConversationList({
  conversations,
  activeSessionId,
  onSelect,
  onCreate,
  onDelete,
}: Props) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) return;
    onCreate(clean);
    setTitle("");
  }

  return (
    <div className="card shadow-sm h-100">
      <div className="card-header bg-white">
        <h6 className="mb-2">Conversations</h6>
        <form onSubmit={handleSubmit} className="input-group input-group-sm">
          <input
            type="text"
            className="form-control"
            placeholder="New conversation title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!title.trim()}
          >
            Add
          </button>
        </form>
      </div>

      <div className="list-group list-group-flush overflow-auto flex-grow-1">
        {conversations.length === 0 && (
          <p className="text-muted text-center small my-4">
            No conversations yet
          </p>
        )}

        {conversations.map((c) => {
          const active = c.session_id === activeSessionId;
          return (
            <div
              key={c.session_id}
              role="button"
              onClick={() => onSelect(c.session_id)}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${
                active ? "active" : ""
              }`}
            >
              <div className="me-2 text-truncate">
                <div className="fw-semibold text-truncate">{c.title}</div>
                <small className={active ? "text-white-50" : "text-muted"}>
                  {new Date(c.created_at).toLocaleDateString()}
                </small>
              </div>
              <button
                type="button"
                aria-label="Delete"
                className={`btn-close ${active ? "btn-close-white" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`Delete "${c.title}"?`))
                    onDelete(c.session_id);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
