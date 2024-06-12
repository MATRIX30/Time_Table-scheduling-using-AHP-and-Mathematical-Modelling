import { CalendarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex items-center justify-between py-5 border-b px-5">
      <Link href={"/"} className="flex items-center space-x-2">
        <CalendarIcon className="font-bold w-6 h-6" />
        <h1 className="text-2xl font-bold">Schedule</h1>
      </Link>
      <nav className="flex items-center justify-items-start gap-2">
      </nav>
    </div>
  );
};

export default Header;
