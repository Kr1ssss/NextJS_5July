import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "../../lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { date, time, activity } = await req.json()

  try {
    const scheduledActivity = await prisma.scheduledActivity.create({
      data: {
        date: new Date(date),
        time,
        activity,
        user: { connect: { email: session.user.email as string } },
      },
    })

    return NextResponse.json(scheduledActivity)
  } catch (error) {
    console.error('Error scheduling activity:', error)
    return NextResponse.json({ error: 'Error scheduling activity' }, { status: 500 })
  }
}