import { revalidateTag } from "next/cache";
import { Repeat } from "lucide-react";
import { Heading } from "@/components/heading";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { getData } from "@/lib/utils";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { OrderType } from "@/types/types";

const OrderListPage = async () => {
  const session = await getServerAuthSession();
  const orders: OrderType[] = await getData(
    "order",
    session?.backendTokens.accessToken
  );
  revalidateTag("collection");
  return (
    <div className="w-11/12 mx-auto">
      <Heading
        title="Orders List"
        description="Manage All Orders From Here."
        icon={Repeat}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <DataTable columns={columns} data={orders || []} />
    </div>
  );
};

export default OrderListPage;
