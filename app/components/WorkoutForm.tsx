'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { useToast } from "../components/ui/use-toast"

export default function WorkoutForm() {
  const [date, setDate] = useState('')
  const [type, setType] = useState('')
  const [duration, setDuration] = useState('')
  const [caloriesBurned, setCaloriesBurned] = useState('')
  const [exercise, setExercise] = useState('')
  const [steps, setSteps] = useState('')
  const [averageHeartRate, setAverageHeartRate] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          type,
          duration,
          caloriesBurned,
          exercise,
          steps,
          averageHeartRate,
        }),
      })
      if (!res.ok) throw new Error('Failed to create workout')
      toast({
        title: "Workout logged successfully!",
        description: "Your workout has been added to your log.",
      })
      
      setDate('')
      setType('')
      setDuration('')
      setCaloriesBurned('')
      setExercise('')
      setSteps('')
      setAverageHeartRate('')
    } catch (error) {
      console.error('Error logging workout:', error)
      toast({
        title: "Error logging workout",
        description: "There was a problem logging your workout. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <Select value={type} onValueChange={setType} required>
        <SelectTrigger>
          <SelectValue placeholder="Select workout type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cardio">Cardio</SelectItem>
          <SelectItem value="strength">Strength</SelectItem>
          <SelectItem value="flexibility">Flexibility</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="number"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Calories burned"
        value={caloriesBurned}
        onChange={(e) => setCaloriesBurned(e.target.value)}
        required
      />
      <Input
        placeholder="Exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Steps"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Average heart rate"
        value={averageHeartRate}
        onChange={(e) => setAverageHeartRate(e.target.value)}
        required
      />
      <Button type="submit">Log Workout</Button>
    </form>
  )
}