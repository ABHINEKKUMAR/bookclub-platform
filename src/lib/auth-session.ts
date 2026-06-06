const TOKEN_KEY = "token";

export function saveAuthSession(token: string) {
  localStorage.setItem(TOKEN_KEY, token);

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; Path=/; Max-Age=604800; SameSite=Lax${secure}`;
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}
