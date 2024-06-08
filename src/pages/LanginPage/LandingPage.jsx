import { Navbar } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar/>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 container mx-auto md:px-6 space-y-10 xl:space-y-16 py-5">
            <div className="grid mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Manage Your School Timetable
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our school timetable app helps you stay organized and on top of your classes, assignments, and events.
                </p>
                <div className="space-x-4 mt-6">
                  <a
                    href="/shedules"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                
                  >
                    Generate timetable
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Effortless Timetable Management</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our school timetable app makes it easy to manage your classes, assignments, and events all in one
                  place.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 p-2 rounded-full">
                    <CalendarIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">Class Scheduling</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Easily manage your class schedule and never miss a lesson.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 p-2 rounded-full">
                    <ClockIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">Assignment Tracking</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Keep track of your assignments and deadlines with ease.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 p-2 rounded-full">
                    <UsersIcon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">Collaborative Scheduling</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Coordinate schedules with your teachers and classmates for seamless collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-stone-700">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Sign up and start managing your school timetable
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our school timetable app is free to use for students and teachers. Sign up today and take control of
                your schedule.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign up to get started.
                <a href="#" className="underline underline-offset-2">
                  Terms &amp; Conditions
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 School Timetable. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </a>
          <a href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}