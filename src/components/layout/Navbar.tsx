import React, { useState } from "react";

import { IoCalendarOutline, IoLogOut, IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import avatarOne from "../../assets/avatar3.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [navbarItem, setNavbarItem] = useState<string>("");

  const navbarItemHandler = (item: string) => {
    setNavbarItem(item);
  };

  return (
    <React.Fragment>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200">
        <Link to="/" className="flex items-center justify-center space-x-2">
          <IoCalendarOutline className="h-6 w-6" />
          <span className="">Scheduling</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link
            to="/sign-in"
            className="text-md font-medium hover:underline underline-offset-4"
            // onClick={navbarItemHandler.bind('sign-in')}
          >
            Sign in
          </Link>
          <Link
            to="/sign-up"
            className="text-md font-medium hover:underline underline-offset-4"
          >
            Sign up
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="border border-gray-200 flex flex-col items-center justify-center h-10 w-10 bg-violet-200">
                <AvatarImage className="object-cover w-8 h-8" src={avatarOne} />
                <AvatarFallback />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-12">
              <DropdownMenuItem className="flex items-center gap-3">
                <IoCalendarOutline size={20} />
                <Link to="/generating">Generate timetable</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-3">
                <IoLogOutOutline size={20} />
                <Link to="/">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
