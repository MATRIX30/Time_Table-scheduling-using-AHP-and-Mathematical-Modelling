
import { ModeToggle } from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import UserInfo from '@/components/UserInfo'
import { LucideMenu } from 'lucide-react'
import React from 'react'

type Props = {}

const Header = (props: Props) => {
  return (
    <div className="flex w-full py-5 border-b">
    <div className="px-5 w-full flex items-center justify-between md:justify-end">
      {/* <Link href={"/"} className="flex items-center space-x-2">
        <CalendarIcon className="font-bold w-6 h-6" />
        <h1 className="text-2xl font-bold">Schedule</h1>
      </Link> */}
      <Button variant={"ghost"} size={"icon"} className='md:hidden'>
        <LucideMenu/>
      </Button>
      <nav className="flex items-center justify-items-start gap-2">
        <UserInfo />
        <ModeToggle />
      </nav>
    </div>
  </div>
  )
}

export default Header