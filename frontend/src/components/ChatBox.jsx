import { useState } from "react";
import sendMessage from "../services/chatService";
import Message from "./Message";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSend = async () => {
    if (question.trim() === "") {
      alert("Please enter a question.");
      return;
    }

    const userMessage = {

      sender: "User",
      text: question,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const result = await sendMessage(question);

      const aiMessage = {

        sender: "AI",
        text: result.answer,
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      setQuestion("");
    } catch (error) {
      console.error(error);

      const errorMessage = {
        sender: "AI",
        text: "Unable to get response from server.",
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ask your question..."
        value={question}
        onChange={handleChange}
      />

      <button onClick={handleSend}>
        Send
      </button>

      <hr />

      <h2>Chat History</h2>

      {messages.map((message, index) => (
        <Message
          key={index}
          sender={message.sender}
          text={message.text}
        />
      ))}
    </div>
  );
}

export default ChatBox;