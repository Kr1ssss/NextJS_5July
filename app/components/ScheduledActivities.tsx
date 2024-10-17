import { Calendar } from 'lucide-react'

interface ScheduledActivity {
  id: string;
  date: Date;
  time: string;
  activity: string;
}

interface ScheduledActivitiesProps {
  activities: ScheduledActivity[];
}

export default function ScheduledActivities({ activities }: ScheduledActivitiesProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
      {activities.length === 0 ? (
        <p>No activities scheduled for today.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((item) => (
            <div key={item.id} className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium text-gray-900 mr-2">{item.time}</span>
              <span className="text-sm text-gray-600">{item.activity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}