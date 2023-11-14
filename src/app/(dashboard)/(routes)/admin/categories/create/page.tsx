import CreateCategory from "@/components/category/create-category";

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-lg text-center mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Create a Category</h1>
      </div>
      <CreateCategory />;
    </>
  );
}
