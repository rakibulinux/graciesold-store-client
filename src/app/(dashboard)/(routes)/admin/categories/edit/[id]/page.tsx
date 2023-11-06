import UpdateCategory from "@/components/category/update-category";

export default function Page({ params }: any) {
  return (
    <>
      <div className="text-gray-900 mx-auto max-w-lg text-center mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Update a Category</h1>
      </div>
      <UpdateCategory params={params} />;
    </>
  );
}
