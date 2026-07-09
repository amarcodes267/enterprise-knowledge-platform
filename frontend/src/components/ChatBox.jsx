import { useMemo, useState } from "react";
import { sendChatMessage } from "../services/chatService";

function ChatBox() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text) return;

    setError("");
    setLoading(true);
    setInput("");

    try {
      const payload = await sendChatMessage(text);

      // Backend returns `history`.
      // We'll trust it but also update optimistically if needed.
      if (Array.isArray(payload.history)) {
        setMessages(payload.history);
      } else {
        setMessages((prev) => [...prev, { role: "user", message: text }, { role: "assistant", message: payload.answer }]);
      }
    } catch (e) {
      setError(e?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          minHeight: 220,
          padding: 12,
          border: "1px solid #ddd",
          borderRadius: 8,
          background: "#fff",
        }}
      >
        {messages.length === 0 ? (
          <div style={{ color: "#666" }}>No messages yet.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, idx) => (
              <div key={idx}>
                <div style={{ fontSize: 12, color: "#777" }}>{m.role || ""}</div>
                <div style={{ whiteSpace: "pre-wrap" }}>{m.message || m.content || ""}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {error ? <div style={{ color: "#b00020" }}>{error}</div> : null}

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={!canSend}
          style={{ padding: "10px 14px", borderRadius: 6, border: 0, background: "#111", color: "#fff" }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatBox;

