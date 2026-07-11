import { useState } from "react";
import sendMessage from "../services/chatService";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSend = async () => {
    if (question.trim() === "") {
      alert("Please enter a question.");
      return;
    }

    try {
      const result = await sendMessage(question);

      setAnswer(result.answer);

      setQuestion("");
    } catch (error) {
      console.error(error);
      setAnswer("Unable to get response from server.");
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

      {answer && (
        <div>
          <h3>AI Response</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default ChatBox;