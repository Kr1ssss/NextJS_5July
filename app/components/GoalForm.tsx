'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function GoalForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [target, setTarget] = useState('')
  const [unit, setUnit] = useState('')
  const [targetDate, setTargetDate] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        target: parseFloat(target),
        unit,
        targetDate,
      }),
    })

    if (response.ok) {
      router.push('/goals')
      router.refresh()
    } else {
      console.error('Failed to create goal')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Goal Title"
              required
            />
          </div>
          <div>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Goal Description"
              required
            />
          </div>
          <div>
            <Input
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="Target Value"
              required
            />
          </div>
          <div>
            <Input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Unit (e.g., kg, km, hours)"
              required
            />
          </div>
          <div>
            <Input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Create Goal</Button>
        </form>
      </CardContent>
    </Card>
  )
}