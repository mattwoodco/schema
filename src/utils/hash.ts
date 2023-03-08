/**
 * This helper function takes a plain text string and returns a SHA-256 hash of it.
 *
 * Usage:
 * const plainText = 'hello world';
 * const hash = sha256(plainText);
 * console.log(hash); // '2ef7bde608ce5404e97d5f042f95f89f1c232871'
 */
export async function sha256(plainText: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(plainText)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/**
 * This helper function takes a plain text string and a hashed string, and returns true if
 * the hash of the plain text string matches the hashed string.
 *
 * Usage:
 * const plainText = 'hello world';
 * const hash = '2ef7bde608ce5404e97d5f042f95f89f1c232871';
 * const isValid = validateHash(plainText, hash);
 * console.log(isValid); // true
 */
export async function validateHash(
  plainText: string,
  hash: string
): Promise<boolean> {
  const hashedPlainText = await sha256(plainText)
  return hashedPlainText === hash
}
