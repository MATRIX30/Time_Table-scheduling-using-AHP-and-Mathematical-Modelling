"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "@/hooks/user-user";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {};

const UserInfo = (props: Props) => {
  const { user, logout } = useUserStore();
  if(!user){
    return null
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn("", { hidden: user === undefined })}
      >
        <Avatar className="cursor-pointer hover:opacity-75 select-none">
          <AvatarImage src={`https://github.com/${user?.username}.png`} />
          <AvatarFallback className="uppercase">
            {user?.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfo;
