import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { getDietPlans } from "@/app/lib/db"
import { DietPlan } from "@/app/types"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Link from "next/link"

export default async function DietPlanPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/signin?callbackUrl=/dietplan')
  }

  const dietPlans = await getDietPlans(session.user.id)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Diet Plans</h1>
      {dietPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dietPlans.map((plan: DietPlan) => (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle>{new Date(plan.date).toLocaleDateString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Calories: {plan.calories}</p>
                <p>Protein: {plan.protein}g</p>
                <p>Carbs: {plan.carbs}g</p>
                <p>Fat: {plan.fat}g</p>
                <p>Water Intake: {plan.waterIntake}ml</p>
                <div>
                  <h3 className="font-bold mt-2">Meals:</h3>
                  {Object.entries(plan.meals as Record<string, string[]>).map(([mealType, foods]) => (
                    <div key={mealType}>
                      <h4 className="font-semibold capitalize">{mealType}:</h4>
                      <ul>
                        {foods.map((food, index) => (
                          <li key={index}>{food}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No diet plans found. Create your first diet plan!</p>
      )}
      <Button className="mt-4">
        <Link href="/dietplan/create">Create New Diet Plan</Link>
      </Button>
    </div>
  )
}