import { Repeat } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { columns } from "./columns";
const data = [
  {
    name: "Order 1",
    status: "Pending",
    time: "10:00 AM",
    date: "2023-11-01",
    image:
      "https://www.pinclipart.com/picdir/big/366-3661806_supermarket-shop-svg-png-icon-free-download-supermarkets.png",
  },
  {
    name: "Order 2",
    status: "Shipped",
    time: "02:30 PM",
    date: "2023-11-02",
    image:
      "https://www.pinclipart.com/picdir/big/366-3661806_supermarket-shop-svg-png-icon-free-download-supermarkets.png",
  },
  {
    name: "Order 3",
    status: "Delivered",
    time: "09:15 AM",
    date: "2023-11-03",
    image:
      "https://www.pinclipart.com/picdir/big/366-3661806_supermarket-shop-svg-png-icon-free-download-supermarkets.png",
  },
  {
    name: "Order 4",
    status: "Pending",
    time: "11:45 AM",
    date: "2023-11-04",
    image:
      "https://www.pinclipart.com/picdir/big/366-3661806_supermarket-shop-svg-png-icon-free-download-supermarkets.png",
  },
];

const ServiceListPage = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Heading
        title="Service List"
        description="Manage All Service From Here."
        icon={Repeat}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <div className="flex flex-col md:flex-row justify-end items-center gap-3 px-4 lg:px-8 my-3">
        <div className="mr-10 md:mr-3">
          <Link className="px-6 md:px-2" href="/admin/services/create">
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              type="submit"
              size="icon"
            >
              Create Service
            </Button>
          </Link>
        </div>
      </div>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default ServiceListPage;
