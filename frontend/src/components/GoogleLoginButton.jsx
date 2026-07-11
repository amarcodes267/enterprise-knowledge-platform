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
        setError("Google token not found in response.");
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

      if (!res.ok || data?.status !== "success") {
        setError(data?.message || data?.status || "Google login failed.");
        return;
      }

      // Backend returns `token` (access token). Frontend utilities expect `access_token`.
      // /auth/google currently does NOT return refresh_token, so only store it if present.
      setTokens({
        access_token: data?.token,
        ...(data?.refresh_token ? { refresh_token: data.refresh_token } : {}),
      });
      window.location.href = "/";
    } catch (e) {
      console.error(e);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleError = () => {
    setError("Google login failed.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />

      {loading ? <div>Signing in...</div> : null}
      {error ? <div style={{ color: "#b00020" }}>{error}</div> : null}
    </div>
  );
}

export default GoogleLoginButton;
