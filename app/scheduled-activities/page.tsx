import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { getScheduledActivities } from "@/app/lib/db"
import { ScheduledActivity } from "@/app/types"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Link from "next/link"

export default async function ScheduledActivitiesPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/signin?callbackUrl=/scheduled-activities')
  }

  const scheduledActivities = await getScheduledActivities(session.user.id)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Scheduled Activities</h1>
      {scheduledActivities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scheduledActivities.map((activity: ScheduledActivity) => (
            <Card key={activity.id}>
              <CardHeader>
                <CardTitle>{activity.activity}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Date: {new Date(activity.date).toLocaleDateString()}</p>
                <p>Time: {activity.time}</p>
                <p>Activity: {activity.activity}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No scheduled activities found. Schedule your first activity!</p>
      )}
      <Button className="mt-4">
        <Link href="/scheduled-activities/create">Schedule New Activity</Link>
      </Button>
    </div>
  )
}