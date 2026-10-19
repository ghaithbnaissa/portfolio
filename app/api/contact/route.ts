import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, email, subject, message } = data

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required.' },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address provided.' },
        { status: 400 },
      )
    }

    const payload = {
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject || 'Portfolio Inquiry').trim(),
      message: String(message).trim(),
      timestamp: new Date().toISOString(),
    }

    console.log(`[CONTACT_TRANSMISSION] [${payload.timestamp}] from="${payload.name}" <${payload.email}> subject="${payload.subject}"`)

    return NextResponse.json({
      success: true,
      message: 'Transmission successfully processed and logged.',
      transmissionId: `TRX-${Date.now().toString(36).toUpperCase()}`,
      timestamp: payload.timestamp,
    })
  } catch (error) {
    console.error('[CONTACT_ERROR]', error)
    return NextResponse.json(
      { error: 'Internal server error processing transmission.' },
      { status: 500 },
    )
  }
}
