const TOKEN_KEY = 'auth_token';
const FORGOT_TOKEN_KEY = 'forgot_token';

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setForgotToken(token: string) {
  localStorage.setItem(FORGOT_TOKEN_KEY, token);
}

export function getForgotToken(): string | null {
  return localStorage.getItem(FORGOT_TOKEN_KEY);
}

export function removeForgotToken() {
  localStorage.removeItem(FORGOT_TOKEN_KEY);
}
