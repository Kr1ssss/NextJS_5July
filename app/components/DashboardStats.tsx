import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

interface DashboardStatsProps {
  steps: number
  waterIntake: number
  calories: number
  averageHeartRate: number  
}

export default function DashboardStats({ steps, waterIntake, calories, averageHeartRate }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{steps}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Water Intake (L)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{waterIntake}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{calories}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Heart Rate (bpm)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageHeartRate}</div>
        </CardContent>
      </Card>
    </div>
  )
}