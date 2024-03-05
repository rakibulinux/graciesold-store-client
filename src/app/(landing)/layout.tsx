import { getServerSession } from "next-auth";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { User } from "@/types/types";
import { getData, getUser } from "@/lib/utils";
import { getServerAuthSession } from "../api/auth/[...nextauth]/route";

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  const userProfile: User = await getUser(
    "users/me",
    session?.backendTokens?.accessToken!
  );
  return (
    <main>
      <Navbar user={userProfile} />
      <div>
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default LandingLayout;
