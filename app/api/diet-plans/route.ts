import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "../../lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { date, meals, waterIntake } = await req.json()

  try {
    const dietPlan = await prisma.dietPlan.create({
      data: {
        date: new Date(date),
        meals,
        waterIntake: parseFloat(waterIntake),
        user: { connect: { email: session.user.email as string } },
      },
    })

    return NextResponse.json(dietPlan)
  } catch (error) {
    console.error('Error creating diet plan:', error)
    return NextResponse.json({ error: 'Error creating diet plan' }, { status: 500 })
  }
}