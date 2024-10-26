'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Workout } from '@/app/types'

type ProgressChartProps = {
  workouts: Workout[]
}

export default function ProgressChart({ workouts }: ProgressChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const data = workouts
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(workout => ({
        date: new Date(workout.date).toLocaleDateString(),
        calories: workout.caloriesBurned,
      }))

    console.log('Progress Chart data:', data)
    setChartData(data)
  }, [workouts])

  if (chartData.length === 0) {
    return <div>No workout data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="calories" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  )
}