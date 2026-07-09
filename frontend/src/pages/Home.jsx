import { useEffect, useState } from "react";
import BASE_URL from "../services/api";

function Home() {
  const [message, setMessage] = useState("Connecting to Flask...");

  useEffect(() => {
    fetch(`${BASE_URL}/health`)
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Unable to connect to Flask");
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>React + Flask Connection</h1>

      <h2>{message}</h2>
    </div>
  );
}

export default Home;