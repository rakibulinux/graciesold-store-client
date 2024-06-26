"use client";
import graciesoldStoreLogo from "@/assets/icons/logo.png";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminRoutes, customerRoutes } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  return (
    <div className="space-y-4 pb-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex justify-center mb-4">
          <Image
            src={graciesoldStoreLogo}
            alt="car repair service"
            width={80}
            height={50}
          />
        </Link>
        <div className="space-y-1">
          {session?.user?.role === "admin" &&
            adminRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          {session?.user?.role === "customer" &&
            customerRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href
                    ? "text-white bg-white/10"
                    : "text-zinc-400"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
