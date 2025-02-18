import { NextResponse } from 'next/server';
import cars from '../../data/cars.json'

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(cars);
}