import { Button } from "@/components/ui/button";
import { Backend_URL } from "@/lib/Constants";
import { getAllData } from "@/lib/utils";
import { MenuType } from "@/types/types";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MenuPage = async () => {
  const menu: MenuType = await getAllData("category");
  revalidateTag("collection");
  return (
    <section className="min-h-screen">
      <div className="container py-5 lg:py-10 mx-auto max-w-[1200px]">
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
          {!!menu ? (
            menu.map((category) => (
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
                {/* <div className={`text-${category.name} w-1/2`}>
                  <h1 className="font-bold text-3xl">{category.name}</h1>
                  <p className="text-sm my-8">{category.description}</p>
                  <button
                    className={`2xl:block bg-${category.color} text-${
                      category.color === "black" ? "white" : "red-500"
                    } py-2 px-4 rounded-md`}
                  >
                    Explore
                  </button>
                </div> */}
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
