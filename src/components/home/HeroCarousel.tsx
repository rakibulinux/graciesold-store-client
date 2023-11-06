"use client";

import Link from "next/link";
const HeroCarousel = () => {
  return (
    <section
      className={`relative bg-[url('/kima.jpg')] bg-cover bg-center bg-no-repeat  flex justify-center`}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 bg-black opacity-20 sm:bg-transparent sm:from-black/95 sm:to-black/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center flex flex-col items-center">
          <h1 className="text-3xl text-white font-extrabold sm:text-5xl">
            Gracie&apos;s Cuisine
          </h1>

          <div className="mt-8 flex flex-wrap gap-1 text-center text-white font-medium">
            <Link
              href="tel:(206) 822-0308"
              className="bg-red-550 py-2.5 px-4 rounded hover:border-2 hover:border-white"
            >
              (206) 822-0308
            </Link>
            <Link
              href="tel:+1206822-0308"
              className="bg-red-550 py-2.5 px-4 rounded hover:border-2 hover:border-white"
            >
              Call To Order
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
