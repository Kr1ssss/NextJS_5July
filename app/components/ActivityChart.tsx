'use client'

import { useState } from 'react'
import { Workout } from '../types'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartData {
  date: string;
  duration: number;
}

export default function ActivityChart({ workouts }: { workouts: Workout[] }) {
  const [timeRange, setTimeRange] = useState('week')

  const getFilteredData = (): ChartData[] => {
    const now = new Date()
    const filteredWorkouts = workouts.filter(workout => {
      const workoutDate = new Date(workout.date)
      if (timeRange === 'week') {
        return now.getTime() - workoutDate.getTime() <= 7 * 24 * 60 * 60 * 1000
      } else if (timeRange === 'month') {
        return now.getTime() - workoutDate.getTime() <= 30 * 24 * 60 * 60 * 1000
      }
      return true // 'all' time range
    })

    const data: Record<string, ChartData> = {}
    filteredWorkouts.forEach(workout => {
      const date = new Date(workout.date).toLocaleDateString()
      if (!data[date]) {
        data[date] = { date, duration: 0 }
      }
      data[date].duration += workout.duration
    })

    return Object.values(data)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Activity</h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border rounded p-1"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="all">All Time</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={getFilteredData()}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="duration" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}