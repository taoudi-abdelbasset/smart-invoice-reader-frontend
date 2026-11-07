import { useAuth } from "../moduls/auth/AuthContext";
import ConversationList from "../moduls/conversations/ConversationList";
import { useConversations } from "../moduls/conversations/useConversations";
import ChatWindow from "../moduls/messages/ChatWindow";
import { useMessages } from "../moduls/messages/useMessages";
import { fileService } from "../moduls/files/fileService";
import { useInvoices } from "../moduls/invoices/useInvoices";
import InvoiceTable from "../moduls/invoices/InvoiceTable";

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
    reload: reloadMessages,
  } = useMessages(activeSessionId);

  const {
    invoices,
    loading: invoicesLoading,
    error: invoicesError,
    reload: reloadInvoices,
  } = useInvoices(activeSessionId);

  async function handleUpload(file: File) {
    if (!activeSessionId) return;
    await fileService.upload(activeSessionId, file);
    await reloadMessages();
    await reloadInvoices();
  }

  async function handleSend(content: string) {
    await sendMessage(content);
    await reloadInvoices();
  }

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
        {(error || messagesError || invoicesError) && (
          <div className="alert alert-danger py-2 mt-3 mb-0">
            {error || messagesError || invoicesError}
          </div>
        )}

        <div className="row h-100 py-3 g-3">
          <div className="col-md-3 col-lg-2 h-100" style={{ minHeight: 0 }}>
            <ConversationList
              conversations={conversations}
              activeSessionId={activeSessionId}
              onSelect={selectConversation}
              onCreate={createConversation}
              onDelete={deleteConversation}
            />
          </div>

          <div className="col-md-9 col-lg-5 h-100" style={{ minHeight: 0 }}>
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
                        onSend={handleSend}
                        onUpload={handleUpload}
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

          <div className="col-12 col-lg-5 h-100" style={{ minHeight: 0 }}>
            <div className="card shadow-sm h-100">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Invoices</h5>
                <span className="badge text-bg-secondary">
                  {invoices.length}
                </span>
              </div>
              <div className="card-body overflow-auto p-2">
                {!activeConversation ? (
                  <p className="text-muted text-center my-4">
                    No conversation selected
                  </p>
                ) : invoicesLoading ? (
                  <div className="text-center my-4">
                    <div className="spinner-border" />
                  </div>
                ) : (
                  <InvoiceTable invoices={invoices} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
