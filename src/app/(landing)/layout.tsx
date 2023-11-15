import { getServerSession } from "next-auth";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { IUser } from "@/interface/userProfile";
import { getData } from "@/lib/utils";
import { getServerAuthSession } from "../api/auth/[...nextauth]/route";

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  const userProfile: IUser = await getData(
    "users/me",
    session?.backendTokens?.accessToken!
  );
  return (
    <main>
      <Navbar data={userProfile} />
      <div>
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default LandingLayout;
