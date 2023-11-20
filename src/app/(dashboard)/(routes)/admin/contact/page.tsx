import { Repeat } from "lucide-react";
import { Heading } from "@/components/heading";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { getData } from "@/lib/utils";
import { getServerAuthSession } from "@/app/api/auth/[...nextauth]/route";
import { Contact } from "@/types/types";
import { revalidateTag } from "next/cache";

const OrderListPage = async () => {
  const session = await getServerAuthSession();
  const contact: Contact[] = await getData(
    "contact",
    session?.backendTokens.accessToken
  );
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
      <DataTable columns={columns} data={contact || []} />
    </div>
  );
};

export default OrderListPage;
