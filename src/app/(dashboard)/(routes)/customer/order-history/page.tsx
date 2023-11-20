import { revalidateTag } from "next/cache";
import { Repeat } from "lucide-react";
import { Heading } from "@/components/heading";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
// import { getData } from "@/lib/utils";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { OrderType, User } from "@/types/types";
import { Backend_URL } from "@/lib/Constants";
import { getData } from "@/lib/utils";

const OrderListPage = async () => {
  const session = await getServerAuthSession();
  const orders: OrderType[] = await getData(
    "order",
    session?.backendTokens.accessToken
  );
  const orderData = orders.filter((order) => order.userId === session?.user.id);

  return (
    <div className="w-11/12 mx-auto">
      <Heading
        title="Orders List"
        description="Manage All Orders From Here."
        icon={Repeat}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <DataTable columns={columns} data={orderData || []} />
    </div>
  );
};

export default OrderListPage;
