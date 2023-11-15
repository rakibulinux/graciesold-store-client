"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Backend_URL } from "@/lib/Constants";
import { IUser } from "@/interface/userProfile";

export function DropdownMenuItems({ data }: IUser) {
  const { data: session } = useSession();
  const signOutUser = async () => {
    const response = await fetch(`${Backend_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.backendTokens?.accessToken}`,
      },
    });
    signOut();
  };
  const profilePic = data?.profile?.profileImg;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src={profilePic ? profilePic : "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuItem onChange={() => setTheme()}>Light</DropdownMenuItem>
        <DropdownMenuItem onChange={setTheme}>Dark</DropdownMenuItem> */}

        <DropdownMenuItem>
          <Link href={`/${session?.user?.role}/`}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/${session?.user?.role}/settings`}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOutUser}>SignOut</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
