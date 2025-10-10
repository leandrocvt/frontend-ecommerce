export function isTokenExpired(exp: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  return exp <= now;
}

export function msUntilExpiration(exp: number): number {
  const now = Math.floor(Date.now() / 1000);
  return Math.max(0, (exp - now) * 1000);
}
