import { CalendarIcon } from "@radix-ui/react-icons";
import React from "react";

import { IoCalendarOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <React.Fragment>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a href="/" className="flex items-center justify-center">
          <IoCalendarOutline className="h-6 w-6" />
          <span className="sr-only">Sheduling</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            href="/classes"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Classes
          </a>
          <a
            href="/shedules"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Schedules
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Teachers
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Students
          </a>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
