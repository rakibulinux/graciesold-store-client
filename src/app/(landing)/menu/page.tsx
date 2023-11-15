import { Backend_URL } from "@/lib/Constants";
import { getAllData } from "@/lib/utils";
import { MenuType } from "@/types/types";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import React from "react";

const getData = async () => {
  const res = await fetch(`${Backend_URL}/category`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed!");
  }
  const data = await res.json();
  return data.data;
};

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
                className="w-full bg-cover p-8"
                style={{
                  backgroundImage: `url(${
                    Backend_URL + category.img![0].path
                  })`,
                }}
              >
                <div className={`text-${category.name} w-1/2`}>
                  <h1 className="font-bold text-3xl">{category.name}</h1>
                  <p className="text-sm my-8">{category.description}</p>
                  <button
                    className={`2xl:block bg-${category.color} text-${
                      category.color === "black" ? "white" : "red-500"
                    } py-2 px-4 rounded-md`}
                  >
                    Explore
                  </button>
                </div>
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
