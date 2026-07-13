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

    if (!res.ok || !data?.success) {
      setError(data?.message || "Google login failed.");
      return;
    }

    setTokens({
      access_token: data.token,
      ...(data.refresh_token
        ? { refresh_token: data.refresh_token }
        : {}),
    });

    window.location.href = "/";
  } catch (e) {
    console.error(e);
    setError("Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};