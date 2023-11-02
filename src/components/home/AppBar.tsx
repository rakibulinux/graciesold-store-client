import Link from "next/link";
import React from "react";
import SignInButton from "../auth/SignInButton";

const AppBar = () => {
  return (
    <header className="flex gap-4 p-4 bg-gradient-to-b shadow">
      <Link className="transition-colors hover:text-blue-500" href={"/"}>
        Home Page
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/dashboard"}
      >
        DashBoard
      </Link>
      <Link
        className="transition-colors hover:text-blue-500"
        href={"/customer"}
      >
        Customer
      </Link>
      <Link className="transition-colors hover:text-blue-500" href={"/admin"}>
        Admin
      </Link>

      <SignInButton />
    </header>
  );
};

export default AppBar;
