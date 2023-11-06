import CreateService from "@/components/service/create-service";

export default function Page() {
  return (
    <>
      <div className="text-gray-900 mx-auto max-w-lg text-center mb-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Create a Service</h1>
      </div>
      <CreateService />
    </>
  );
}
