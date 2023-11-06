"use client";
import { DropdownMenuItems } from "../dropdown-menu";

import { useSession } from "next-auth/react";
import { MobileSidebar } from "./mobile-sidebar";

export const DashboardNavbar = () => {
  const { data: session }: any = useSession();
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        {session?.role && (
          <>
            <DropdownMenuItems />
          </>
        )}
      </div>
    </div>
  );
};
