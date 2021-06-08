/**
 * Creates a cookie
 * @param name - Name of the cookie
 * @param value - Value of the cookie
 * @param hours - Number of hours the cookie should be valid (default: 1 hour)
 */
export function setCookie(name: string, value: string, hours = 1): void {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

/**
 * Retrieves a cookie value
 * @param name - Name of the cookie
 * @returns Cookie value
 */
export function getCookie(name: string): string {
  const cookies = document.cookie.split(';');
  return cookies
    .find((cookie) => cookie.trim().split('=')[0] === name)
    ?.trim()
    .split('=')[1];
}
