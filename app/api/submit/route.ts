import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData);

    const paramaters = new URLSearchParams(
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, String(value)])
      )
    ).toString();

    return NextResponse.redirect(new URL(`/details?${paramaters}`, req.url));
  } catch (error) {
    console.error('Error handling POST request', error);
    return NextResponse.json({ error: 'internal Server Error' }, { status: 500});
  }
}