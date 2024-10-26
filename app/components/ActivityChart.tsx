'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Workout, ScheduledActivity } from '@/app/types'

type ActivityChartProps = {
  workouts: Workout[]
  scheduledActivities: ScheduledActivity[]
}

export function ActivityChart({ workouts, scheduledActivities }: ActivityChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const combinedActivities = [...workouts, ...scheduledActivities].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 7)

    const data = combinedActivities.map(activity => ({
      date: new Date(activity.date).toLocaleDateString(),
      duration: 'duration' in activity ? activity.duration : 0,
      calories: 'caloriesBurned' in activity ? activity.caloriesBurned : 0,
      type: 'type' in activity ? 'Workout' : 'Scheduled',
    }))

    console.log('Chart data:', data)
    setChartData(data)
  }, [workouts, scheduledActivities])

  if (chartData.length === 0) {
    return <div>No activity data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Bar yAxisId="left" dataKey="duration" fill="#8884d8" name="Duration (minutes)" />
        <Bar yAxisId="right" dataKey="calories" fill="#82ca9d" name="Calories Burned" />
      </BarChart>
    </ResponsiveContainer>
  )
}