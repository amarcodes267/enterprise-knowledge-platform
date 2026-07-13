import { useState } from "react";
import sendMessage from "../services/chatService";
import Message from "./Message";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSend = async () => {
    const q = question.trim();
    if (!q) return;

    setSending(true);

    const userMessage = { sender: "User", text: q };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setQuestion("");

    try {
      const result = await sendMessage(q);
      const aiMessage = { sender: "AI", text: result.answer };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        sender: "AI",
        text: "Unable to get response from server.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="glass chat-card">
      <div className="chat-input-row">
        <input
          className="input"
          type="text"
          placeholder="Ask your question..."
          value={question}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          disabled={sending}
        />
        <button className="btn btn-primary" onClick={handleSend} disabled={sending}>
          {sending ? "Sending..." : "Send"}
        </button>
      </div>

      <div className="chat-divider" />

      <div className="chat-history">
        <h2>Chat History</h2>
        {messages.length === 0 ? (
          <div className="empty">Start by asking a question.</div>
        ) : null}

        <div className="message-list">
          {messages.map((message, index) => (
            <Message key={index} sender={message.sender} text={message.text} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatBox;