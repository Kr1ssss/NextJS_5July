'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export default function CreateDietPlan() {
  const router = useRouter()
  const [date, setDate] = useState('')
  const [breakfast, setBreakfast] = useState('')
  const [lunch, setLunch] = useState('')
  const [dinner, setDinner] = useState('')
  const [snacks, setSnacks] = useState('')
  const [waterIntake, setWaterIntake] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const meals = {
      breakfast: breakfast.split(',').map(item => item.trim()),
      lunch: lunch.split(',').map(item => item.trim()),
      dinner: dinner.split(',').map(item => item.trim()),
      snacks: snacks.split(',').map(item => item.trim()),
    }
    const response = await fetch('/api/diet-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        meals,
        waterIntake: parseFloat(waterIntake),
        calories: parseInt(calories),
        protein: parseFloat(protein),
        carbs: parseFloat(carbs),
        fat: parseFloat(fat),
      }),
    })

    if (response.ok) {
      router.push('/dietplan')
    } else {
      console.error('Failed to create diet plan')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create New Diet Plan</CardTitle>
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
                type="text"
                value={breakfast}
                onChange={(e) => setBreakfast(e.target.value)}
                placeholder="Breakfast (comma-separated items)"
                required
              />
            </div>
            <div>
              <Input
                type="text"
                value={lunch}
                onChange={(e) => setLunch(e.target.value)}
                placeholder="Lunch (comma-separated items)"
                required
              />
            </div>
            <div>
              <Input
                type="text"
                value={dinner}
                onChange={(e) => setDinner(e.target.value)}
                placeholder="Dinner (comma-separated items)"
                required
              />
            </div>
            <div>
              <Input
                type="text"
                value={snacks}
                onChange={(e) => setSnacks(e.target.value)}
                placeholder="Snacks (comma-separated items)"
                required
              />
            </div>
            <div>
              <Input
                type="number"
                value={waterIntake}
                onChange={(e) => setWaterIntake(e.target.value)}
                placeholder="Water Intake (ml)"
                required
              />
            </div>
            <div>
              <Input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Calories"
                required
              />
            </div>
            <div>
              <Input
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="Protein (g)"
                required
              />
            </div>
            <div>
              <Input
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="Carbs (g)"
                required
              />
            </div>
            <div>
              <Input
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                placeholder="Fat (g)"
                required
              />
            </div>
            <Button type="submit">Create Diet Plan</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}