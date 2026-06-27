import { NextResponse } from 'next/server'

interface ContactBody {
  fullName: string
  email: string
  phone: string
  message: string
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json()

    if (!body.fullName || !body.email || !body.phone || !body.message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
