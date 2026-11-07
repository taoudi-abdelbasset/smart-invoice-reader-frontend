import { useAuth } from "../moduls/auth/AuthContext";
import ConversationList from "../moduls/conversations/ConversationList";
import { useConversations } from "../moduls/conversations/useConversations";

export default function ChatPage() {
  const { logout } = useAuth();
  const {
    conversations,
    activeSessionId,
    activeConversation,
    loading,
    error,
    selectConversation,
    createConversation,
    deleteConversation,
  } = useConversations();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand mb-0 h1">Smart Invoice Reader</span>
        <button className="btn btn-outline-light btn-sm" onClick={logout}>
          Logout
        </button>
      </nav>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", gap: 20, padding: 16 }}>
        <div style={{ width: 300 }}>
          <ConversationList
            conversations={conversations}
            activeSessionId={activeSessionId}
            onSelect={selectConversation}
            onCreate={createConversation}
            onDelete={deleteConversation}
          />
        </div>

        <div style={{ flex: 1 }}>
          {activeConversation ? (
            <h4>{activeConversation.title}</h4>
          ) : (
            <p>Select or create a conversation</p>
          )}
        </div>
      </div>
    </>
  );
}
