'use client'

import Link from 'next/link'
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { useSession } from "next-auth/react"
import { SignOutButton } from './SignOutButton'

export function Navigation() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Fitness Tracker
          </Link>
          <div className="flex items-center space-x-4">
            {status === "authenticated" && session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/log-workout">
                  <Button variant="ghost">Log Workout</Button>
                </Link>
                <Link href="/dietplan">
                  <Button variant="ghost">Diet Plan</Button>
                </Link>
                <Link href="/scheduled-activities">
                  <Button variant="ghost">Schedule Activity</Button>
                </Link>
                <Link href="/goals">
                  <Button variant="ghost">Goals</Button>
                </Link>
                <Avatar>
                  <AvatarImage src={session.user?.image || undefined} alt="User avatar" />
                  <AvatarFallback>{session.user?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <SignOutButton />
              </>
            ) : (
              <Link href="/signin">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}