import { FaQuoteLeft } from "react-icons/fa6";
import { Review } from "@/types/types";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import StarRating from "./ratings";
import { Backend_URL } from "@/lib/Constants";

const ReviewCard = ({ singleReview }: { singleReview: Review }) => {
  return (
    <div className="my-4">
      <div className="mb-6 flex items-center gap-5">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={
              singleReview?.user?.profile?.profileImg
                ? Backend_URL + singleReview?.user?.profile?.profileImg.path!
                : "https://github.com/shadcn.png"
            }
          />
          <AvatarFallback>GSS</AvatarFallback>
        </Avatar>
        <div>
          <h5 className="mb-1 text-sm font-semibold">
            {singleReview?.user?.name}
          </h5>
          <StarRating rating={singleReview?.rating} maxRating={5} />
        </div>
      </div>

      <p className="mb-4 flex items-center gap-1 italic">
        <FaQuoteLeft />
        {singleReview?.comment}
      </p>
    </div>
  );
};

export default ReviewCard;
