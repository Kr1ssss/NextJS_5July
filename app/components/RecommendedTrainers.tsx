import Image from 'next/image'

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

interface RecommendedTrainersProps {
  trainers: Trainer[];
}

export default function RecommendedTrainers({ trainers }: RecommendedTrainersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Recommended Trainers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="flex items-center space-x-4">
            <Image src={trainer.image} alt={trainer.name} width={50} height={50} className="rounded-full" />
            <div>
              <p className="text-sm font-medium text-gray-900">{trainer.name}</p>
              <p className="text-sm text-gray-600">{trainer.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}