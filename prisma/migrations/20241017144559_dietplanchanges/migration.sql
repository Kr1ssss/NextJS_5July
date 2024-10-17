/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `calories` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carbs` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterIntake` to the `DietPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetDate` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `ScheduledActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ScheduledActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageHeartRate` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `steps` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Made the column `exercise` on table `Workout` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "DietPlan" DROP CONSTRAINT "DietPlan_userId_fkey";

-- DropForeignKey
ALTER TABLE "Goal" DROP CONSTRAINT "Goal_userId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduledActivity" DROP CONSTRAINT "ScheduledActivity_userId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_userId_fkey";

-- AlterTable
ALTER TABLE "DietPlan" ADD COLUMN     "calories" INTEGER NOT NULL,
ADD COLUMN     "carbs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "protein" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "waterIntake" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "targetDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ScheduledActivity" ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "averageHeartRate" INTEGER NOT NULL,
ADD COLUMN     "steps" INTEGER NOT NULL,
ALTER COLUMN "exercise" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietPlan" ADD CONSTRAINT "DietPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledActivity" ADD CONSTRAINT "ScheduledActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
