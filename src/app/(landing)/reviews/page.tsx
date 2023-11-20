import ReviewCard from "@/components/review/review-card";
import { getAllData } from "@/lib/utils";
import { Review } from "@/types/types";
import Link from "next/link";

const page = async () => {
  const reviews: Review[] = await getAllData("review");
  return (
    <section className="min-h-screen">
      <div
        className={`relative bg-[url('/kima.jpg')] bg-cover bg-center bg-no-repeat  flex justify-center`}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-black opacity-20 sm:bg-transparent sm:from-black/95 sm:to-black/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center flex flex-col items-center">
            <h1 className="text-3xl text-white font-extrabold sm:text-5xl">
              Reviews
            </h1>

            <div className="mt-8 flex flex-wrap gap-1 text-center text-white font-medium">
              Read trusted reviews from our customers
            </div>
          </div>
        </div>
      </div>
      <div className="my-10 mx-auto w-9/12 gap-6 text-center grid grid-cols-1 md:grid-cols-2 lg:gap-12">
        {reviews?.map((review) => (
          <ReviewCard key={review.id} singleReview={review} />
        ))}
      </div>
    </section>
  );
};

export default page;
