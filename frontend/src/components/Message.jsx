function Message({ sender, text }) {
  const isUser = sender === "User";

  return (
    <div className={isUser ? "message message-user" : "message message-ai"}>
      <div className="message-sender">{sender}</div>
      <div className="message-bubble">
        <pre className="message-text">{text}</pre>
      </div>
    </div>
  );
}

export default Message;
