import UpdateCategory from "@/components/category/update-category";
import { getSingleData } from "@/lib/utils";

export default async function Page({ params }: any) {
  const category = await getSingleData("category", params.id);
  return (
    <>
      <div className="mx-auto max-w-lg text-center mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Update a Category</h1>
      </div>
      <UpdateCategory category={category} />;
    </>
  );
}
