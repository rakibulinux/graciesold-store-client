import { getServerSession } from "next-auth";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const LandingLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />
      <div>
        {children}
        <Footer />
      </div>
    </main>
  );
};

export default LandingLayout;
