import { User as PrismaUser, Workout as PrismaWorkout, Goal as PrismaGoal, DietPlan as PrismaDietPlan, ScheduledActivity as PrismaScheduledActivity, Trainer as PrismaTrainer } from "@prisma/client"

export type User = PrismaUser
export type Workout = PrismaWorkout
export type Goal = PrismaGoal
export type ScheduledActivity = PrismaScheduledActivity
export type Trainer = PrismaTrainer
export type DietPlan = PrismaDietPlan

export type UserStats = {
  totalWorkouts: number;
  totalDuration: number;
  steps: number;
  distance: number;
  calories: number;
};