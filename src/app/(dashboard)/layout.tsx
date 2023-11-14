import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardNavbar } from "@/components/dashboard/dashboard-navbar";
import { getServerAuthSession } from "../api/auth/[...nextauth]/route";
import { getData } from "@/lib/utils";
import { IUser } from "@/interface/userProfile";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  const userProfile: IUser = await getData(
    "users/me",
    session?.backendTokens?.accessToken!
  );
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72 pb-2">
        <DashboardNavbar data={userProfile.data} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
