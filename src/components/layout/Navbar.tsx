import React, { useState } from "react";

import { IoCalendarOutline, IoLogOut, IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import avatarOne from "../../assets/avatar3.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { URL_SERVER } from "@/constants/constants";

const Navbar = () => {
  const [navbarItem, setNavbarItem] = useState<string>("");

  const navbarItemHandler = (item: string) => {
    setNavbarItem(item);
  };




  const navigate = useNavigate();
  
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };


  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  let user = null;
  
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error("Erreur lors du parsing JSON :", error);
    }
  } else {
    console.log("Aucune valeur trouvée pour 'user' dans le localStorage.");
  }
  
  // Maintenant 'user' contient soit l'objet utilisateur parsé, soit null si aucune valeur n'a été trouvée ou si le parsing a échoué.
  console.log(user);
  
  


  return (
    <React.Fragment>
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200">
        <Link to="/" className="flex items-center justify-center space-x-2">
          <IoCalendarOutline className="h-6 w-6" />
          <span className="">Scheduling</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          {!token && (
            <span className="space-x-5">
              <Link
                to="/sign-in"
                className="text-md font-medium hover:underline underline-offset-4"
                onClick={() => navbarItemHandler("sign-in")}
              >
                Sign in
              </Link>
              <Link
                to="/sign-up"
                className="text-md font-medium hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </span>
          )}

          {token && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="border border-gray-200 flex flex-col items-center justify-center h-10 w-10 bg-violet-200">
                  {/* <AvatarImage
                    className="object-cover w-8 h-8"
                    src={avatarOne}
                  /> */}
                  <h1 className="py-3">{user.email[0].toUpperCase()}</h1>
                  <AvatarFallback />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-12">
                {/* <DropdownMenuItem className="flex items-center gap-3 disabled"> 
                  <IoCalendarOutline size={20} />
                  <Link to="/generating">Generate timetable</Link>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-3">
                  <IoLogOutOutline size={20} />
                  <Link to="/" onClick={logoutHandler}>
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
