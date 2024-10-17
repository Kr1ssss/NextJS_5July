import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Prisma } from '@prisma/client'

type JsonValue = Prisma.JsonValue

export interface DietPlan {
  id: string
  date: Date
  userId: string
  meals: JsonValue
  calories: number;
  protein: number;
  fat: number;
  carbs: number;

}

interface DietMenuProps {
  dietPlan: DietPlan | null
}

export default function DietMenu({ dietPlan }: DietMenuProps) {
  const meals = dietPlan?.meals as { [key: string]: string[] } | null

  if (!dietPlan || !meals) {
    return <div>No diet plan available.</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diet Plan for {new Date(dietPlan.date).toLocaleDateString()}</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(meals).map(([mealType, items]) => (
          <div key={mealType} className="mb-4">
            <h3 className="text-lg font-semibold capitalize">{mealType}</h3>
            <ul className="list-disc list-inside">
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}