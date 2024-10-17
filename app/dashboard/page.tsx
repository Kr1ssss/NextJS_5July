import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { prisma } from "../lib/prisma"
import DashboardStats from "../components/DashboardStats"
import ActivityChart from "../components/ActivityChart"
import ProgressChart from "../components/ProgressChart"
import RecommendedTrainers from "../components/RecommendedTrainers"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/signin?callbackUrl=/dashboard')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    include: { 
      workouts: {
        orderBy: { date: 'desc' },
        take: 7,
      },
      dietPlans: {
        orderBy: { date: 'desc' },
        take: 1,
      },
      scheduledActivities: {
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
  })

  if (!user) {
    return <div>User not found</div>
  }

  const latestWorkout = user.workouts[0]
  const latestDietPlan = user.dietPlans[0]

  const stats = {
    steps: latestWorkout?.steps || 0,
    waterIntake: latestDietPlan?.waterIntake || 0,
    calories: latestWorkout?.caloriesBurned || 0,
    averageHeartRate: latestWorkout?.averageHeartRate || 0,
  }

  const trainers = await prisma.trainer.findMany({
    take: 3,
  })

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <DashboardStats {...stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityChart workouts={user.workouts} />
        <ProgressChart workouts={user.workouts} />
      </div>
      <RecommendedTrainers trainers={trainers} />
    </div>
  )
}