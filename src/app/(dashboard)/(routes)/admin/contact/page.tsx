import { Repeat } from "lucide-react";
import { Heading } from "@/components/heading";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { getData, getQueryData } from "@/lib/utils";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { Contact } from "@/types/types";
import { revalidateTag } from "next/cache";

const OrderListPage = async ({
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

  const where = {}; // Use an object for the where parameter
  const session = await getServerAuthSession();
  const contact = await getQueryData({
    url: "contact",
    token: session?.backendTokens.accessToken,
    page,
    perPage,
    searchValue,
    where,
    orderBy,
  });
  console.log(contact);
  revalidateTag("collection");
  return (
    <div className="w-11/12 mx-auto">
      <Heading
        title="Contacts List"
        description="Manage All Contacts From Here."
        icon={Repeat}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <DataTable
        columns={columns}
        data={contact || []}
        searchableColumns={[
          {
            id: "email",
            title: "Email",
          },
        ]}
      />
    </div>
  );
};

export default OrderListPage;
