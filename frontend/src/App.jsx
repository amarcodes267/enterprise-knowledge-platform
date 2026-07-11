import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Chat from "./pages/Chat";
import Search from "./pages/Search";
import About from "./pages/About";
import Login from "./pages/Login";

import { fetchMe, getAccessToken } from "./utils/auth";

function ProtectedRoute({ children, accessToken }) {
  if (!accessToken) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getAccessToken();

    (async () => {
      if (!token) {
        setUser(null);
        setChecking(false);
        return;
      }

      const me = await fetchMe(token);
      setUser(me);
      setChecking(false);
    })();
  }, []);

  const accessToken = getAccessToken();

  if (checking) {
    return (
      <div style={{ padding: 24 }}>Loading...</div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/upload"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute accessToken={accessToken}>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
