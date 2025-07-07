import { NextRequest, NextResponse } from 'next/server'
import { translate } from '@vitalets/google-translate-api'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    if (!text) {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 })
    }
    const result = await translate(text, { to: 'ru' })
    return NextResponse.json({ translated: result.text })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Translation error' }, { status: 500 })
  }
} 