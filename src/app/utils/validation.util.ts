export function validateLogin(email: string, password: string): string | null {
  if (!email || !password) {
    return 'Email and password are required.';
  }
  // Simple email regex for demo
//   const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
//   if (!emailRegex.test(email)) {
//     return 'Invalid email format.';
//   }
  if (password.length < 4) {
    return 'Password must be at least 4 characters.';
  }
  return null;
}
