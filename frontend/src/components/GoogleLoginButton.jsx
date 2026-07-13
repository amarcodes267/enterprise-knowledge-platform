const data = await res.json().catch(() => ({}));

console.log("Backend response:", data);

if (!res.ok || !data?.success) {
  console.log("FAILED HERE");
  setError(data?.message || "Google login failed.");
  return;
}

console.log("SUCCESS BEFORE setTokens");

setTokens({
  access_token: data?.token,
  ...(data?.refresh_token ? { refresh_token: data.refresh_token } : {}),
});

console.log("SUCCESS AFTER setTokens");

window.location.href = "/";