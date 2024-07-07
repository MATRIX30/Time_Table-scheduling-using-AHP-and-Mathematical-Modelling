import {
  CalendarDaysIcon,
  GraduationCap,
  LayoutDashboard,
  Settings2,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const Sidebar = (props: Props) => {
  const pathName = usePathname();

  const isCurrentPath = (path: string) => {
    return pathName === path;
  };

  return (
    <div className="h-full flex-1 w-full flex flex-col font-roboto">
      <div className="py-6 px-3 flex items-center justify-start select-none">
        <CalendarDaysIcon className="w-8 h-8 mr-2"/>
        <h1 className="text-3xl font-bold bg-clip-text w-full">
          Shedule 
        </h1>
        {/* <h1 className="text-3xl font-bold ">S</h1> */}
      </div>
      <div className="px-1 py-5 flex flex-col space-y-2">
        <Link
          href="/dashboard"
          className={`p-4 rounded-md cursor-pointer flex items-center gap-5 ${
            isCurrentPath("/dashboard") ? "font-bold" : ""
          }`}
        >
          <LayoutDashboard className="min-w-6 min-h-6" />
          <span className="">Dashboard</span>
        </Link>
        <Link
          href="/dashboard/students-preferences"
          className={`p-4 rounded-md cursor-pointer flex items-center gap-5 ${
            isCurrentPath("/dashboard/students-preferences") ? "font-bold" : ""
          }`}
        >
          <Users2 className="min-w-6 min-h-6" />
          <span className="">Student Preference</span>
        </Link>
        <Link
          href="/dashboard/lecturer-preferences"
          className={`p-4 rounded-md cursor-pointer flex items-center gap-5 ${
            isCurrentPath("/dashboard/lecturer-preferences") ? "font-bold" : ""
          }`}
        >
          <GraduationCap className="min-w-6 min-h-6" />
          <span className="">Lecturer Preference</span>
        </Link>
        <Link
          href="/dashboard/admin-preferences"
          className={`p-4 rounded-md cursor-pointer flex items-center gap-5 ${
            isCurrentPath("/dashboard/admin-preferences") ? "font-bold" : ""
          }`}
        >
          <Settings2 className="min-w-6 min-h-6" />
          <span className="">Admin Preference</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
