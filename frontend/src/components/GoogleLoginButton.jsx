import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import BASE_URL from "../services/api";
import { setTokens } from "../utils/auth";

function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSuccess = async (credentialResponse) => {
    setError("");
    setLoading(true);

    try {
      const googleToken = credentialResponse?.credential;

      if (!googleToken) {
        setError("Google token not found.");
        return;
      }

      const res = await fetch(`${BASE_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: googleToken }),
      });

      const data = await res.json().catch(() => ({}));

      console.log("Backend response:", data);

      if (!res.ok || !data.success) {
        console.log("FAILED HERE");
        setError(data.message || "Google login failed.");
        return;
      }

      console.log("SUCCESS BEFORE setTokens");

      setTokens({
        access_token: data.token,
      });

      console.log("SUCCESS AFTER setTokens");

      window.location.href = "/";
    } catch (e) {
      console.error(e);
      setError("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    setError("Google login failed.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      {loading && <div>Signing in...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default GoogleLoginButton;