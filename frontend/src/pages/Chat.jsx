import ChatBox from "../components/ChatBox";

function Chat() {
  return (
    <div className="page">
      <div className="container">
        <header className="page-header">
          <h1>Chat with Your Documents</h1>
          <p>Ask questions over your enterprise knowledge base with instant responses.</p>
        </header>

        <ChatBox />
      </div>
    </div>
  );
}

export default Chat;
