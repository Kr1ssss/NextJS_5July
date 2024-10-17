import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Fitness Tracker</span>
        </h1>

        <p className="mt-3 text-2xl">
          Start tracking your fitness journey today!
        </p>

        <div className="flex mt-6">
          <Link href="/dashboard" className="mx-4 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Go to Dashboard
          </Link>
          <Link href="/log-workout" className="mx-4 px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
            Log a Workout
          </Link>
        </div>
      </main>
    </div>
  )
}