import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'stride2026';
const SECRET = process.env.ADMIN_SECRET || 'stride-secret-key-2026-production';

/**
 * Validates the admin password
 */
export function verifyAdminPassword(password: string): boolean {
  if (!password) return false;
  return password === ADMIN_PASSWORD;
}

/**
 * Creates a signed admin session token
 */
export function createAdminToken(): string {
  const payload = {
    role: 'admin',
    timestamp: Date.now(),
  };
  const stringified = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(stringified)
    .digest('base64url');
  return `${stringified}.${signature}`;
}

/**
 * Verifies a signed admin session token
 */
export function verifyAdminToken(token?: string | null): boolean {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [stringified, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', SECRET)
    .update(stringified)
    .digest('base64url');

  if (signature !== expectedSignature) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(stringified, 'base64url').toString('utf-8'));
    // Valid for 7 days
    const isExpired = Date.now() - payload.timestamp > 7 * 24 * 60 * 60 * 1000;
    return payload.role === 'admin' && !isExpired;
  } catch {
    return false;
  }
}

/**
 * Extracts and verifies token from incoming HTTP Request
 */
export function isAuthenticatedAdmin(request: Request): boolean {
  // Check Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (verifyAdminToken(token)) return true;
  }

  // Check custom header
  const customToken = request.headers.get('x-admin-token');
  if (customToken && verifyAdminToken(customToken)) {
    return true;
  }

  // Check Cookie header
  const cookieHeader = request.headers.get('cookie');
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map((c) => c.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith('stride_admin_token=')) {
        const token = cookie.substring('stride_admin_token='.length);
        if (verifyAdminToken(token)) return true;
      }
    }
  }

  return false;
}
