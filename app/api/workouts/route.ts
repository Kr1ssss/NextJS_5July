import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "../../lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { date, type, duration, caloriesBurned, exercise, steps, averageHeartRate } = await req.json()

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const workout = await prisma.workout.create({
      data: {
        date: new Date(date),
        type,
        duration: parseInt(duration),
        caloriesBurned: parseInt(caloriesBurned),
        exercise,
        steps: parseInt(steps),
        averageHeartRate: parseInt(averageHeartRate),
        userId: user.id,
      },
    })

    return NextResponse.json(workout)
  } catch (error) {
    console.error('Error creating workout:', error)
    return NextResponse.json({ error: 'Error creating workout' }, { status: 500 })
  }
}