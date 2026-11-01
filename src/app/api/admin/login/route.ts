import { NextResponse } from 'next/server';
import { verifyAdminPassword, createAdminToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!verifyAdminPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin password.' },
        { status: 401 }
      );
    }

    const token = createAdminToken();

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful',
      token,
    });

    // Set secure HTTP-only cookie
    response.cookies.set('stride_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Error during admin login:', error);
    return NextResponse.json(
      { success: false, error: 'Login request failed.' },
      { status: 500 }
    );
  }
}
