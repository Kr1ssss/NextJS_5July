import { Workout } from '../types'

export default function ProgressChart({ workouts }: { workouts: Workout[] }) {

  const mockData = [
    { name: 'Cardio', value: 30, color: 'bg-blue-500' },
    { name: 'Strength', value: 40, color: 'bg-green-500' },
    { name: 'Flexibility', value: 20, color: 'bg-yellow-500' },
    { name: 'Balance', value: 10, color: 'bg-red-500' },
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Progress</h3>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
              Total: 40hrs
            </span>
          </div>
        </div>
        <div className="flex h-4 mb-4 overflow-hidden bg-gray-200 rounded">
          {mockData.map((item, index) => (
            <div
              key={index}
              style={{ width: `${item.value}%` }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${item.color}`}
            ></div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          {mockData.map((item, index) => (
            <span key={index}>{item.name}: {item.value}hrs</span>
          ))}
        </div>
      </div>
    </div>
  )
}