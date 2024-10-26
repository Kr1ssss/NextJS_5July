'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export default function ScheduleActivity() {
  const router = useRouter()
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [activity, setActivity] = useState('')
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/scheduled-activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        time,
        activity,
        name,
        duration: parseInt(duration),
      }),
    })

    if (response.ok) {
      router.push('/scheduled-activities')
    } else {
      console.error('Failed to schedule activity')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Schedule New Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Date"
                required
              />
            </div>
            <div>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Time"
                required
              />
            </div>
            <div>
              <Input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="Activity"
                required
              />
            </div>
            <div>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div>
              <Input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration (minutes)"
                required
              />
            </div>
            <Button type="submit">Schedule Activity</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}