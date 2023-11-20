import { Repeat } from "lucide-react";
import { Heading } from "@/components/heading";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { getData } from "@/lib/utils";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { OrderType } from "@/types/types";
import { User } from "@/types/types";

const OrderListPage = async () => {
  const session = await getServerAuthSession();
  const users: User[] = await getData(
    "users",
    session?.backendTokens.accessToken
  );
  return (
    <div className="w-11/12 mx-auto">
      <Heading
        title="Users List"
        description="Manage All Customers From Here."
        icon={Repeat}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <DataTable columns={columns} data={users || []} />
    </div>
  );
};

export default OrderListPage;
