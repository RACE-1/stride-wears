import { NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  const isAuth = isAuthenticatedAdmin(request);
  return NextResponse.json({
    authenticated: isAuth,
  });
}
