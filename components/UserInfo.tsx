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
import { signOut } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getSession } from "@/lib/getSession";

type Props = {};

const UserInfo = (props: Props) => {
  const {data:session} = useQuery({
    queryKey:["user"],
    queryFn:()=>getSession()
  })
  console.log({session})
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn("", {"hidden":!session?.user  })}
      >
        <Avatar className="cursor-pointer hover:opacity-75 select-none">
          <AvatarImage src={`https://github.com/${session?.user.username}.png`} />
          <AvatarFallback className="uppercase">
            {session?.user.username.charAt(0)}
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
        <DropdownMenuItem onClick={()=>{
          signOut();
        }}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfo;
