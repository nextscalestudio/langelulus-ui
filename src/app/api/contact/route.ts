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

    // TODO: Replace with real Nodemailer SMTP transport once credentials are configured.
    // Example setup:
    //   const transporter = nodemailer.createTransport({
    //     host: process.env.SMTP_HOST,
    //     port: Number(process.env.SMTP_PORT),
    //     auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    //   })
    //   await transporter.sendMail({ from: body.email, to: 'shop@parfum.vn', subject: 'Contact', text: body.message })
    console.log('[contact] email payload:', {
      from: body.email,
      name: body.fullName,
      phone: body.phone,
      message: body.message,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
