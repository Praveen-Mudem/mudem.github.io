const TOKEN_KEY = 'auth_token';
const RESET_TOKEN_KEY = 'reset_token';

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setResetToken(token: string) {
  localStorage.setItem(RESET_TOKEN_KEY, token);
}

export function getResetToken(): string | null {
  return localStorage.getItem(RESET_TOKEN_KEY);
}

export function removeResetToken() {
  localStorage.removeItem(RESET_TOKEN_KEY);
}
