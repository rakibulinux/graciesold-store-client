"use client";
import Price from "@/components/product/Price";
import { Backend_URL } from "@/lib/Constants";
import { ProductType } from "@/types/types";
import Image from "next/image";
import BestProductCard from "./product-card";
import WriteReview from "@/components/review/write-review";
import ReviewCard from "@/components/review/review-card";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Fade from "react-reveal/Fade";
// import Carousel from "@/components/Carousel";
interface IProductType {
  products: ProductType[];
  singleProduct: ProductType;
}

const SingleProduct = ({ products, singleProduct }: IProductType) => {
  return (
    <section className="min-h-screen">
      <div className="container py-5 lg:py-5 mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-0 md:p-5">
          {/* IMAGE CONTAINER */}
          {singleProduct.images && (
            //@ts-ignore

            <div className="md:col-span-1 h-20">
              <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showArrows={true}
                showThumbs={false}
              >
                {singleProduct?.images.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={Backend_URL + image.path}
                      alt={singleProduct.name}
                      className="w-full h-96 rounded-xl shadow-xl"
                      width={400}
                      height={300}
                    />
                  </div>
                ))}
              </Carousel>
              {/* <div className="relative">
                  <div className="max-w-lg">
                    <Carousel slides={singleProduct?.images} />
                  </div>
                </div> */}
            </div>
          )}
          {/* TEXT CONTAINER */}
          {
            //@ts-ignore
            <div className="flex flex-col gap-14 mt-80 md:mt-0">
              <h1 className="text-xl md:text-3xl font-semibold">
                <span>{singleProduct.name}</span>
                {/* {session?.user.role === "admin" && (
                    <DeleteButton id={singleProduct.id} />
                  )} */}
              </h1>
              <div>
                <h3 className="text-lg my-2 font-semibold text-gray-700">
                  Description
                </h3>
                <p className="text-gray-600">{singleProduct.description}</p>
              </div>
              <Price product={singleProduct} />
            </div>
          }
        </div>
      </div>
      <div className="container max-w-[1200px] mx-auto py-5 px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Best For You
        </h2>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Find the products that are best for you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
          {products?.slice(0, 3).map((product) => (
            <BestProductCard key={product.id} singleProduct={product} />
          ))}
        </div>
      </div>
      <div className="container max-w-[1200px] mx-auto py-5 px-5">
        <WriteReview productId={singleProduct.id} />
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          Read trusted reviews from our customers
        </h2>
        <p className="text-lg text-gray-600 mb-10 text-center">
          Find the product reviews from our customers.
        </p>
        <div className="w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 px-5">
          {!!singleProduct?.reviews?.length &&
            singleProduct?.reviews?.map((review) => (
              <ReviewCard key={review.id} singleReview={review} />
            ))}
        </div>
        {!singleProduct?.reviews?.length && (
          <div>
            <p className="text-2xl text-center">
              No Reviews are added for this product
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SingleProduct;
