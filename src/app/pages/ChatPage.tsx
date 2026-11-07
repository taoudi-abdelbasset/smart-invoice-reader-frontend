import { useAuth } from "../moduls/auth/AuthContext";
import ConversationList from "../moduls/conversations/ConversationList";
import { useConversations } from "../moduls/conversations/useConversations";
import ChatWindow from "../moduls/messages/ChatWindow";
import { useMessages } from "../moduls/messages/useMessages";

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

  const {
    messages,
    loading: messagesLoading,
    sending,
    error: messagesError,
    sendMessage,
  } = useMessages(activeSessionId);

  if (loading)
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" />
      </div>
    );

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand mb-0 h1">Smart Invoice Reader</span>
        <button className="btn btn-outline-light btn-sm" onClick={logout}>
          Logout
        </button>
      </nav>

      <div
        className="container-fluid bg-light"
        style={{ height: "calc(100vh - 56px)" }}
      >
        {(error || messagesError) && (
          <div className="alert alert-danger py-2 mt-3 mb-0">
            {error || messagesError}
          </div>
        )}

        <div className="row h-100 py-3 g-3">
          <div className="col-md-4 col-lg-3 h-100" style={{ minHeight: 0 }}>
            <ConversationList
              conversations={conversations}
              activeSessionId={activeSessionId}
              onSelect={selectConversation}
              onCreate={createConversation}
              onDelete={deleteConversation}
            />
          </div>

          <div className="col-md-8 col-lg-9 h-100" style={{ minHeight: 0 }}>
            <div className="card shadow-sm h-100">
              {activeConversation ? (
                <>
                  <div className="card-header bg-white">
                    <h5 className="mb-0">{activeConversation.title}</h5>
                  </div>
                  <div
                    className="card-body d-flex flex-column"
                    style={{ minHeight: 0 }}
                  >
                    {messagesLoading ? (
                      <div className="m-auto spinner-border" />
                    ) : (
                      <ChatWindow
                        messages={messages}
                        sending={sending}
                        onSend={sendMessage}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="card-body d-flex align-items-center justify-content-center text-muted">
                  Select or create a conversation
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}