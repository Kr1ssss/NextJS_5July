import { Goal } from '../types'

export default function GoalsList({ goals }: { goals: Goal[] }) {
  return (
    <ul className="space-y-2">
      {goals.map((goal) => (
        <li key={goal.id} className="bg-white p-3 rounded-lg shadow flex justify-between items-center">
          <span>{goal.description}</span>
          <span className="text-sm text-gray-600">{goal.target} {goal.unit}</span>
        </li>
      ))}
    </ul>
  )
}