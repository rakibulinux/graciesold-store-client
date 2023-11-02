"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

const SignInButton = () => {
  const { data: session } = useSession();
  console.log({ session });

  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.name}</p>
        <Button
          onClick={() => signOut()}
          className="flex gap-4 ml-auto text-red-600"
        >
          Sign Out
        </Button>
        <ModeToggle />
      </div>
    );

  return (
    <div className="flex gap-4 ml-auto items-center">
      <Link href={"/sign-in"} className="flex gap-4 ml-auto text-green-600">
        Sign In
      </Link>
      <Link
        href={"/sign-up"}
        className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded"
      >
        Sign Up
      </Link>
      <ModeToggle />
    </div>
  );
};

export default SignInButton;
