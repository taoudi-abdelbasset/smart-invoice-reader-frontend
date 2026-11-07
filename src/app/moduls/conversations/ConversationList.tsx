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
    <div>
      <h5>Conversations</h5>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Conversation title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {conversations.length === 0 && <li>No conversations yet</li>}

        {conversations.map((c) => (
          <li key={c.session_id}>
            <button onClick={() => onSelect(c.session_id)}>
              {c.session_id === activeSessionId ? "▶ " : ""}
              {c.title}
            </button>
            <button onClick={() => onDelete(c.session_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
