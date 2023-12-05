import HeroCarousel from "@/components/home/HeroCarousel";
import WelcomeText from "@/components/home/WelcomeText";
import PhotoGallery from "@/components/home/PhotoGallery";
import Reviews from "@/components/home/Reviews";
import ContactForm from "./contact/page";
import { Review } from "@/types/types";
import { getAllData } from "@/lib/utils";
import { revalidateTag } from "next/cache";

const LandingPage = async () => {
  const reviews: Review[] = await getAllData("review");
  revalidateTag("collection");
  return (
    <>
      <section className="">
        <HeroCarousel />
      </section>
      <section>
        <WelcomeText />
      </section>

      <section className="relative my-10 overflow-hidden">
        <div className="w-10/12 mx-auto mb-14">
          <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:items-center md:flex-row md:space-x-4 text-sky-650 my-10">
            <hr className="w-full md:w-52 h-1 bg-sky-650" />
            <span className="text-lg md:text-3xl font-bold">Photos</span>
            <hr className="w-full md:w-52 h-1 bg-sky-650" />
          </div>
          <PhotoGallery />
        </div>
        <div className="absolute w-[200%] h-full top-0 left-[-50%] z-[-1] bg-gray-850 text-white transform rotate-3"></div>
      </section>

      <section className="my-2">
        <Reviews reviews={reviews} />
      </section>
      <section className="w-11/12 mx-auto">
        <div className="flex flex-col items-center justify-center md:items-center md:flex-row md:space-x-4 text-sky-650 my-10">
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
