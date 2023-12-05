import { revalidateTag } from "next/cache";
import { Repeat } from "lucide-react";
import { Heading } from "@/components/heading";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
// import { getData } from "@/lib/utils";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { OrderType } from "@/types/types";
import { getQueryData } from "@/lib/utils";

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
  const session = await getServerAuthSession();
  const where = { userId: session?.user.id }; // Use an object for the where parameter
  const orders = await getQueryData({
    url: "order",
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
        title="Orders List"
        description="Manage All Orders From Here."
        icon={Repeat}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <DataTable
        columns={columns}
        data={orders}
        // Render notion like filters
        advancedFilter={false}
        // Render dynamic searchable filters
        // Render floating filters at the bottom of the table on column selection
        floatingBar={true}
        // Delete rows action
        searchableColumns={[
          {
            id: "order_number",
            title: "Order Number",
          },
          {
            id: "userId",
            title: "UserId",
          },
          {
            id: "intent_id",
            title: "Intent Id",
          },
        ]}
      />
    </div>
  );
};

export default OrderListPage;
