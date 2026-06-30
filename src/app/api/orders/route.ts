import { NextResponse } from 'next/server'
import type { Order } from '@/types'

export async function POST(request: Request) {
  try {
    const order: Order = await request.json()

    if (!order.id || !order.items?.length || !order.recipient) {
      return NextResponse.json({ error: 'Invalid order payload' }, { status: 400 })
    }

    // Mock persistence — client reads this from localStorage key 'parfum-orders'
    return NextResponse.json({ orderId: order.id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to process order' }, { status: 500 })
  }
}
