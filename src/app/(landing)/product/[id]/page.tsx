import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import DeleteButton from "@/components/product/DeleteButton";
import Price from "@/components/product/Price";
import { Backend_URL } from "@/lib/Constants";
import { ProductType } from "@/types/types";
import Image from "next/image";
import React from "react";

const getData = async (id: string) => {
  const res = await fetch(`${Backend_URL}/product/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }
  const data = await res.json();
  return data.data;
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerAuthSession();
  const singleProduct: ProductType = await getData(params.id);
  return (
    <section className="min-h-screen">
      <div className="container py-5 lg:py-10 mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-5">
          {/* IMAGE CONTAINER */}
          {singleProduct.images && (
            <div className="md:col-span-1">
              <Image
                src={Backend_URL + singleProduct.images[0].path}
                alt={singleProduct.name}
                className="w-full h-auto rounded-xl shadow-xl"
                width={400}
                height={300}
              />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex flex-col gap-14">
            <h1 className="text-xl md:text-3xl font-semibold">
              <span>{singleProduct.name}</span>
              {session?.user.role === "admin" && (
                <DeleteButton id={singleProduct.id} />
              )}
            </h1>
            <div>
              <h3 className="text-lg my-2 font-semibold text-gray-700">
                Description
              </h3>
              <p className="text-gray-600">{singleProduct.description}</p>
            </div>
            <Price product={singleProduct} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
