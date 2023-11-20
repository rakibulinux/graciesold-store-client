"use client";
import { DropdownMenuItems } from "../dropdown-menu";

import { useSession } from "next-auth/react";
import { MobileSidebar } from "./mobile-sidebar";
import { User } from "@/types/types";

export const DashboardNavbar = ({ user }: { user: User }) => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        {session?.user.role && (
          <>
            <DropdownMenuItems user={user} />
          </>
        )}
      </div>
    </div>
  );
};
