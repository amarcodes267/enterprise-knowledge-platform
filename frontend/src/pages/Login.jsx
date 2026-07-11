import { useEffect } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { getAccessToken } from "../utils/auth";

function Login() {
  useEffect(() => {
    const access = getAccessToken();
    if (access) window.location.href = "/";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: 12,
        padding: 16,
      }}
    >
      <h1>Enterprise Knowledge Platform</h1>

      <p>Sign in to continue</p>

      <GoogleLoginButton />
    </div>
  );
}

export default Login;
