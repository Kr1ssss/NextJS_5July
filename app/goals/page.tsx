import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { prisma } from "../lib/prisma"
import GoalForm from "../components/GoalForm"

export default async function Goals() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string },
    include: { goals: true },
  })

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Goals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Current Goals</h2>
          {user?.goals.length ? (
            <ul>
              {user.goals.map((goal) => (
                <li key={goal.id} className="mb-2">
                  {goal.description} - Progress: {goal.progress}/{goal.target} {goal.unit}
                </li>
              ))}
            </ul>
          ) : (
            <p>No goals set yet.</p>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Set a New Goal</h2>
          <GoalForm />
        </div>
      </div>
    </div>
  )
}