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
import { User } from "@/types/types";

export function DropdownMenuItems({ user }: { user?: User }) {
  const { data: session } = useSession();
  const signOutUser = async () => {
    await fetch(`${Backend_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.backendTokens?.accessToken}`,
      },
    });
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src={
                user?.profile?.profileImg
                  ? Backend_URL + user?.profile?.profileImg.path
                  : "https://github.com/shadcn.png"
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuItem onChange={() => setTheme()}>Light</DropdownMenuItem>
        <DropdownMenuItem onChange={setTheme}>Dark</DropdownMenuItem> */}

        <Link href={`/${session?.user?.role}/`}>
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </Link>
        <Link href={`/${session?.user?.role}/settings`}>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={signOutUser}>SignOut</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
