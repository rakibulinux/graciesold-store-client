import { getServerSession } from "next-auth";
import HeroCarousel from "@/components/home/HeroCarousel";
import WelcomeText from "@/components/home/WelcomeText";
import PhotoGallery from "@/components/home/PhotoGallery";
import Reviews from "@/components/home/Reviews";
import ContactForm from "./contact/page";

const LandingPage = async () => {
  return (
    <>
      <section className="">
        <HeroCarousel />
      </section>
      <section>
        <WelcomeText />
      </section>

      <section className="relative my-32   overflow-hidden">
        <div className="w-10/12 mx-auto my-32">
          <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:items-center md:flex-row md:space-x-4 text-sky-650 my-10">
            <hr className="w-full md:w-52 h-1 bg-sky-650" />
            <span className="text-lg md:text-3xl font-bold">Photos</span>
            <hr className="w-full md:w-52 h-1 bg-sky-650" />
          </div>
          <PhotoGallery />
        </div>
        <div className="absolute w-[200%] h-full top-0 left-[-50%] z-[-1] bg-gray-850 text-white transform rotate-3"></div>
      </section>

      <section className="my-32">
        <Reviews />
      </section>
      <section className="w-10/12 mx-auto my-32">
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:items-center md:flex-row md:space-x-4 text-sky-650 my-10">
          <hr className="w-full md:w-52 h-1 bg-sky-650" />
          <span className="text-lg md:text-3xl font-bold">Contact Us</span>
          <hr className="w-full md:w-52 h-1 bg-sky-650" />
        </div>
        <ContactForm />
      </section>
    </>
  );
};

export default LandingPage;
