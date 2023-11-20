import { Review } from "@/types/types";
import { FaQuoteLeft } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import StarRating from "../review/ratings";
import { Backend_URL } from "@/lib/Constants";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className="mt-3 w-10/12 mx-auto text-lg">
      <div className="flex flex-col items-center justify-center space-y-4 md:space-y-0 md:items-center md:flex-row md:space-x-4 text-sky-650 my-2">
        <hr className="w-full md:w-52 h-1 bg-sky-650" />
        <span className="text-lg md:text-3xl font-bold">Reviews</span>
        <hr className="w-full md:w-52 h-1 bg-sky-650" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {reviews.slice(0, 6).map((review) => (
          <div
            key={review.id}
            className="block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 "
          >
            <div className="mb-6 flex items-center gap-5">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={
                    review?.user?.profile?.profileImg
                      ? Backend_URL! + review?.user?.profile?.profileImg.path
                      : "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <h5 className="mb-1 text-sm font-semibold">
                  {review?.user?.name}
                </h5>
                <StarRating rating={review?.rating} maxRating={5} />
              </div>
            </div>
            <p className="flex gap-1 items-center font-normal text-black-950">
              <span className="text-sky-600">
                <FaQuoteLeft />
              </span>
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
