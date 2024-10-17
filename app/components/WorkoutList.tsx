import { Workout } from '../types'

export default function WorkoutList({ workouts }: { workouts: Workout[] }) {
  return (
    <ul className="space-y-4">
      {workouts.map((workout) => (
        <li key={workout.id} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">{workout.exercise}</h2>
          <p className="text-gray-600">
            {workout.duration} minutes on {new Date(workout.date).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  )
}