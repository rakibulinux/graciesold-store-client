"use client";
import { DropdownMenuItems } from "../dropdown-menu";

import { useSession } from "next-auth/react";
import { MobileSidebar } from "./mobile-sidebar";
import { IUser } from "@/interface/userProfile";

export const DashboardNavbar = ({ data }: IUser) => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        {session?.user.role && (
          <>
            <DropdownMenuItems data={data} />
          </>
        )}
      </div>
    </div>
  );
};
