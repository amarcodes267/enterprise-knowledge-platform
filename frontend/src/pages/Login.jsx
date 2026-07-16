import { useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { setTokens, getAccessToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const access = getAccessToken();
    if (access) navigate("/");
  }, [navigate]);

  const handleAuthSuccess = async (userCredential) => {
    try {
      const token = await userCredential.user.getIdToken();
      setTokens({ access_token: token });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to process authentication.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await handleAuthSuccess(userCredential);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await handleAuthSuccess(userCredential);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      await handleAuthSuccess(userCredential);
    } catch (err) {
      console.error(err);
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        gap: 16,
        padding: 16,
      }}
    >
      <h1>Enterprise Knowledge Platform</h1>
      <p>{isSignUp ? "Create an account" : "Sign in to continue"}</p>

      {error && <div style={{ color: "red", maxWidth: 300, textAlign: "center" }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 300 }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "8px 12px", borderRadius: 4, border: "1px solid #ccc" }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "8px 12px", borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button type="submit" disabled={loading} style={{ padding: "10px", cursor: "pointer", background: "#007BFF", color: "#fff", border: "none", borderRadius: 4 }}>
          {loading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
        </button>
      </form>

      <button onClick={handleGoogleSignIn} disabled={loading} style={{ padding: "10px", cursor: "pointer", background: "#DB4437", color: "#fff", border: "none", borderRadius: 4, width: "100%", maxWidth: 300 }}>
        Continue with Google
      </button>

      <div style={{ marginTop: 10, cursor: "pointer", color: "#007BFF" }} onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </div>
    </div>
  );
}

export default Login;
