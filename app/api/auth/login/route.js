import { NextResponse } from 'next/server';
import { verifyCredentials, signToken } from '@/lib/auth';

export async function POST(request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
  }

  const user = verifyCredentials(username, password);
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = signToken({ username: user.username });
  return NextResponse.json({ token, username: user.username });
}
