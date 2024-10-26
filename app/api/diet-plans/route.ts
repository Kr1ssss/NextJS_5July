import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from "../../lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { date, meals, waterIntake, calories, protein, carbs, fat } = await req.json()

  try {
    const dietPlan = await prisma.dietPlan.create({
      data: {
        date: new Date(date),
        meals: JSON.stringify(meals), 
        waterIntake: parseFloat(waterIntake),
        calories: parseInt(calories),
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
        user: { connect: { email: session.user.email as string } },
      },
    })

    return NextResponse.json(dietPlan)
  } catch (error) {
    console.error('Error creating diet plan:', error)
    return NextResponse.json({ error: 'Error creating diet plan' }, { status: 500 })
  }
}