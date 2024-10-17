'use client'

import { useState } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useToast } from "../components/ui/use-toast"

export default function DietPlanForm() {
  const [date, setDate] = useState('')
  const [meals, setMeals] = useState('')
  const [waterIntake, setWaterIntake] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/diet-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          meals: JSON.parse(meals),
          waterIntake: parseFloat(waterIntake),
        }),
      })
      if (!res.ok) throw new Error('Failed to create diet plan')
      toast({
        title: "Diet plan created successfully!",
        description: "Your diet plan has been added.",
      })
      // Reset form
      setDate('')
      setMeals('')
      setWaterIntake('')
    } catch (error) {
      console.error('Error creating diet plan:', error)
      toast({
        title: "Error creating diet plan",
        description: "There was a problem creating your diet plan. Please try again.",
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
        placeholder="Enter meals as JSON (e.g., {'breakfast': ['Oatmeal', 'Banana'], 'lunch': ['Salad', 'Chicken']})"
        value={meals}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMeals(e.target.value)}
        required
      />
      <Input
        type="number"
        step="0.1"
        placeholder="Water intake (in liters)"
        value={waterIntake}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWaterIntake(e.target.value)}
        required
      />
      <Button type="submit">Create Diet Plan</Button>
    </form>
  )
}