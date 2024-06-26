import { CalendarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { LogInIcon } from "lucide-react";
import LoginBtn from "./LoginBtn";
import { ModeToggle } from "./ModeToggle";
import UserInfo from "./UserInfo";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex w-full py-5 border-b">
      <div className="container mx-auto w-full flex items-center justify-between">
        <Link href={"/"} className="flex items-center space-x-2">
          <CalendarIcon className="font-bold w-6 h-6" />
          <h1 className="text-2xl font-bold">Schedule</h1>
        </Link>
        <nav className="flex items-center justify-items-start gap-2">
          <UserInfo />
          <LoginBtn />
          <ModeToggle />
        </nav>
      </div>
    </div>
  );
};  

export default Header;
