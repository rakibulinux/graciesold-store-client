import { Repeat } from "lucide-react";
import { Heading } from "@/components/heading";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { getQueryData } from "@/lib/utils";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";

const CustomerListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [field, order] =
    typeof searchParams.sort === "string"
      ? searchParams.sort.split(".")
      : ["createdAt", "desc"]; // Provide default values
  const orderBy = { [field]: order };
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const perPage = searchParams["per_page"] ?? "10";
  const searchValue =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const where = { role: "customer" }; // Use an object for the where parameter
  const session = await getServerAuthSession();
  // mocked, skipped and limited in the real app

  try {
    const data = await getQueryData({
      url: "users",
      token: session?.backendTokens.accessToken,
      page,
      perPage,
      searchValue,
      where,
      orderBy,
    });

    return (
      <div className="w-11/12 mx-auto">
        <Heading
          title="Customers List"
          description="Manage All Customers From Here."
          icon={Repeat}
          iconColor="text-orange-700"
          bgColor="bg-orange-700/10"
        />
        <DataTable
          columns={columns}
          data={data}
          // Render notion like filters
          advancedFilter={false}
          // Render dynamic searchable filters
          // Render floating filters at the bottom of the table on column selection
          floatingBar={true}
          // Delete rows action

          searchableColumns={[
            {
              id: "name",
              title: "name",
            },
          ]}
        />
        {/* <DataTables
          columns={columns}
          data={data.data}
          pageCount={Number(perPage)}
        /> */}
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error or display an error message to the user
  }
};

export default CustomerListPage;
