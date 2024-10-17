import { Prisma } from '@prisma/client'
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
  const recentWorkouts = await prisma.workout.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: limit,
  });
  return recentWorkouts;
}

export async function getDietPlans(userId: string): Promise<DietPlan[]> {
  const dietPlans = await prisma.dietPlan.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
  });
  return dietPlans.map(plan => ({
    ...plan,
    meals: plan.meals as Prisma.JsonValue
  }));
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

export async function getScheduledActivities(userId: string): Promise<ScheduledActivity[]> {
  const scheduledActivities = await prisma.scheduledActivity.findMany({
    where: { userId },
    orderBy: { date: 'asc' },
  });
  return scheduledActivities;
}

export async function createScheduledActivity(activity: Omit<ScheduledActivity, 'id'>): Promise<ScheduledActivity> {
  const createdActivity = await prisma.scheduledActivity.create({
    data: activity,
  });
  return createdActivity;
}


export async function getTrainers(): Promise<Trainer[]> {
  const trainers = await prisma.trainer.findMany();
  return trainers;
}

export async function createTrainer(trainer: Omit<Trainer, 'id'>): Promise<Trainer> {
  const createdTrainer = await prisma.trainer.create({
    data: trainer,
  });
  return createdTrainer;
}