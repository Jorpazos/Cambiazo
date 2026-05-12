export const PASSWORD_MIN_LENGTH = 8;

export function validatePassword(password: string): { ok: true } | { ok: false; error: string } {
  if (typeof password !== "string") {
    return { ok: false, error: "La contraseña es obligatoria." };
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { ok: false, error: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.` };
  }
  if (!/[A-Za-z]/.test(password)) {
    return { ok: false, error: "La contraseña debe incluir al menos una letra." };
  }
  if (!/[0-9]/.test(password)) {
    return { ok: false, error: "La contraseña debe incluir al menos un número." };
  }
  return { ok: true };
}

export function validateEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  // Pragmatic check, not RFC 5322 strict
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
