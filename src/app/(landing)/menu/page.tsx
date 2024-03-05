import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { Backend_URL } from "@/lib/Constants";
import { getQueryData } from "@/lib/utils";
import { CategoryType } from "@/types/types";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MenuPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [field, order] =
    typeof searchParams.sort === "string"
      ? searchParams.sort.split(".")
      : ["createdAt", "asc"]; // Provide default values
  const orderBy = { [field]: order };
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const perPage = searchParams["per_page"] ?? "10";
  const searchValue =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const where = {}; // Use an object for the where parameter
  const menu = await getQueryData({
    url: "category",
    page,
    perPage,
    searchValue,
    where,
    orderBy,
  });
  revalidateTag("collection");
  return (
    <section className="min-h-screen">
      <div className="container py-5 lg:py-10 mx-auto max-w-[1200px]">
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {!!menu ? (
            menu.data.map((category: CategoryType) => (
              <Link
                href={`/menu/${category.slug}`}
                key={category.id}
                className="rounded-xl relative"
                // style={{
                //   backgroundImage: `url(${
                //     Backend_URL + category.img![0].path
                //   })`,
                // }}
              >
                <div className="absolute w-full h-full bg-black/30 rounded-xl text-white">
                  <p className="font-bold text-2xl px-2 pt-4">
                    {category.name}{" "}
                  </p>
                  <p className="px-2">{category.description}</p>
                  <Button
                    variant="outline"
                    className="border rounded-xl px-5 py-1 border-white bg-white text-black hover:bg-black/50 hover:text-white border-none mx-2 mt-5 absolute bottom-4"
                  >
                    Explore
                  </Button>
                </div>
                <Image
                  className="max-h-[200px]  md:max-h-[200px] w-full object-cover rounded-xl"
                  src={Backend_URL! + category.img?.path}
                  alt={category.name}
                  width={500}
                  height={500}
                />
              </Link>
            ))
          ) : (
            <div className="">
              <p>No Category Found on this page</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MenuPage;
