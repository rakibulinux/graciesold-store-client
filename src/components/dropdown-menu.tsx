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

export function DropdownMenuItems() {
  const { data: session }: any = useSession();

  console.log(session);
  const profilePic = session?.user?.profile?.profileImg;
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
        <DropdownMenuItem onClick={() => signOut()}>SignOut</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
