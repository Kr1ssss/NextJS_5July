'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useToast } from "../components/ui/use-toast"

export default function ScheduledActivityForm() {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [activity, setActivity] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/scheduled-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          time,
          activity,
        }),
      })
      if (!res.ok) throw new Error('Failed to schedule activity')
      toast({
        title: "Activity scheduled successfully!",
        description: "Your activity has been added to your schedule.",
      })
      // Reset form
      setDate('')
      setTime('')
      setActivity('')
    } catch (error) {
      console.error('Error scheduling activity:', error)
      toast({
        title: "Error scheduling activity",
        description: "There was a problem scheduling your activity. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="date"
        value={date}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
        required
      />
      <Input
        type="time"
        value={time}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
        required
      />
      <Input
        placeholder="Activity"
        value={activity}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActivity(e.target.value)}
        required
      />
      <Button type="submit">Schedule Activity</Button>
    </form>
  )
}