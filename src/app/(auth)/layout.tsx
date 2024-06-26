import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
