import { PrismaClient } from '@prisma/client';
import { Workout, UserStats, DietPlan, ScheduledActivity, Trainer } from '../types';

const prisma = new PrismaClient();

export async function getWorkouts(userId: string): Promise<Workout[]> {
  const workouts = await prisma.workout.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  });
  return workouts;
}

export async function createWorkout(workout: Omit<Workout, 'id'>): Promise<Workout> {
  const createdWorkout = await prisma.workout.create({
    data: workout,
  });
  return createdWorkout;
}

export async function getUserStats(userId: string): Promise<UserStats> {
  const workouts = await getWorkouts(userId);

  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
  const calories = workouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);

 
  const steps = 0; 
  const distance = 0; 

  return {
    totalWorkouts,
    totalDuration,
    steps,
    distance,
    calories,
  };
}

export async function getRecentWorkouts(userId: string, limit: number = 5): Promise<Workout[]> {
  try {
    console.log(`Fetching recent workouts for user: ${userId}`);
    const recentWorkouts = await prisma.workout.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: limit,
    });
    console.log(`Found ${recentWorkouts.length} recent workouts`);
    return recentWorkouts;
  } catch (error) {
    console.error('Error fetching recent workouts:', error);
    return [];
  }
}


export async function getDietPlans(userId: string): Promise<DietPlan[]> {
  const dietPlans = await prisma.dietPlan.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  });
  return dietPlans.map(plan => ({
    ...plan,
    meals: plan.meals as any
  }));
}
export async function getLatestDietPlan(userId: string): Promise<DietPlan | null> {
  try {
    console.log(`Fetching latest diet plan for user: ${userId}`);
    const latestDietPlan = await prisma.dietPlan.findFirst({
      where: { userId },
      orderBy: { date: 'desc' },
    });
    console.log(`Latest diet plan found: ${latestDietPlan ? 'Yes' : 'No'}`);
    return latestDietPlan;
  } catch (error) {
    console.error('Error fetching latest diet plan:', error);
    return null;
  }
}

export async function createDietPlan(dietPlan: Omit<DietPlan, 'id'>): Promise<DietPlan> {
  const createdDietPlan = await prisma.dietPlan.create({
    data: {
      ...dietPlan,
      meals: JSON.stringify(dietPlan.meals)
    },
  });
  return {
    ...createdDietPlan,
    meals: JSON.parse(createdDietPlan.meals as string)
  };
}


export async function createScheduledActivity(activity: Omit<ScheduledActivity, 'id'>): Promise<ScheduledActivity> {
  const createdActivity = await prisma.scheduledActivity.create({
    data: activity,
  });
  return createdActivity;
}


export async function getScheduledActivities(userId: string): Promise<ScheduledActivity[]> {
  try {
    console.log(`Fetching scheduled activities for user: ${userId}`);
    const activities = await prisma.scheduledActivity.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 10,
    });
    console.log(`Found ${activities.length} scheduled activities`);
    return activities;
  } catch (error) {
    console.error('Error fetching scheduled activities:', error);
    return [];
  }
}

export async function getRecommendedTrainers(): Promise<Trainer[]> {
  try {
    console.log('Fetching recommended trainers');
    const trainers = await prisma.trainer.findMany({
      take: 3,
    });
    console.log(`Found ${trainers.length} recommended trainers:`, trainers);
    return trainers;
  } catch (error) {
    console.error('Error fetching recommended trainers:', error);
    return [];
  }
}


export async function createTrainer(trainer: Omit<Trainer, 'id'>): Promise<Trainer> {
  const createdTrainer = await prisma.trainer.create({
    data: trainer,
  });
  return createdTrainer;
}