"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/assets/icons/logo.png";
import { useSession } from "next-auth/react";
import { ModeToggle } from "../mode-toggle";
import { DropdownMenuItems } from "../dropdown-menu";
import CartIcon from "../product/CartIcon";
import { User } from "@/types/types";
const navItems = [
  { name: "HOME", url: "/" },
  { name: "MENU", url: "/menu" },
  { name: "CONTACT", url: "/contact" },
];

const Navbar = ({ user }: { user?: User }) => {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const [open, setOpen] = useState(false);
  return (
    <header className="top-0 sticky py-4 px-5 lg:px-10 flex justify-between items-center z-20 w-full bg-black-150">
      <nav className="container flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-2 ml-24 md:ml-0">
          <Image src={logo} width={70} height={70} alt="logo" />
        </Link>
        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <Menu />
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-16 left-0 w-full bg-black-150 md:hidden z-10 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="p-4 flex flex-col items-center justify-center gap-4 text-white font-normal">
            {navItems.map((item) => (
              <Link
                key={item.url}
                className="hover:underline"
                href={item.url}
                onClick={toggleMobileMenu} // Close mobile menu on item click
              >
                {item.name}
              </Link>
            ))}
            <li className="list-none">
              <Link
                href="tel:+1206822-0308"
                className="bg-red-550 py-2.5 px-4 rounded"
              >
                CALL TO ORDER
              </Link>
            </li>
            <li className="list-none mt-4">
              <Link href="/cart" onClick={() => setOpen(false)}>
                <CartIcon />
              </Link>
            </li>
            <div className="flex">
              {session ? (
                <DropdownMenuItems user={user!} />
              ) : (
                <>
                  <Link
                    className="rounded-md bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                    href="/sign-in"
                  >
                    Login
                  </Link>
                  <Link
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-sky-600 ml-4"
                    href="/sign-up"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 text-white font-normal">
          {navItems.map((item) => (
            <li className="list-none" key={item.url}>
              <Link className="hover:underline" href={item.url}>
                {item.name}
              </Link>
            </li>
          ))}
          <li className="list-none">
            <Link
              href="tel:+1206822-0308"
              className="bg-red-550 py-2.5 px-4 rounded"
            >
              CALL TO ORDER
            </Link>
          </li>
          <li className="list-none">
            <Link href="/cart" onClick={() => setOpen(false)}>
              <CartIcon />
            </Link>
          </li>
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <div className="hidden sm:flex">
                {session ? (
                  <DropdownMenuItems user={user} />
                ) : (
                  <>
                    <Link
                      className="rounded-md bg-sky-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                      href="/sign-in"
                    >
                      Login
                    </Link>
                    <Link
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-sky-600 ml-4"
                      href="/sign-up"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
