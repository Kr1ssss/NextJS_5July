import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { getRecentWorkouts, getLatestDietPlan, getScheduledActivities, getRecommendedTrainers } from "@/app/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ActivityChart } from "../components/ActivityChart"
import ProgressChart from "../components/ProgressChart"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/signin?callbackUrl=/dashboard')
  }

  console.log('Fetching data for user:', session.user.id)

  const recentWorkouts = await getRecentWorkouts(session.user.id)
  const latestDietPlan = await getLatestDietPlan(session.user.id)
  const scheduledActivities = await getScheduledActivities(session.user.id)
  const recommendedTrainers = await getRecommendedTrainers()

  console.log('Recent Workouts:', recentWorkouts)
  console.log('Scheduled Activities:', scheduledActivities)
  console.log('Recommended Trainers:', recommendedTrainers)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityChart workouts={recentWorkouts} scheduledActivities={scheduledActivities} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent>
            {recentWorkouts.length > 0 ? (
              <ProgressChart workouts={recentWorkouts} />
            ) : (
              <p>No workout data available to show progress</p>
            )}
          </CardContent>
        </Card>
        {latestDietPlan && (
          <Card>
            <CardHeader>
              <CardTitle>Latest Diet Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {new Date(latestDietPlan.date).toLocaleDateString()}</p>
              <p>Calories: {latestDietPlan.calories}</p>
              <p>Water Intake: {latestDietPlan.waterIntake}ml</p>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Trainers</CardTitle>
          </CardHeader>
          <CardContent>
            {recommendedTrainers.length > 0 ? (
              <ul>
                {recommendedTrainers.map((trainer) => (
                  <li key={trainer.id}>{trainer.name} - {trainer.specialty}</li>
                ))}
              </ul>
            ) : (
              <p>No recommended trainers available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}