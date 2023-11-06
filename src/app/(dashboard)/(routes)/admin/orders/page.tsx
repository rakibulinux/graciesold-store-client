"use client";

import { Repeat } from "lucide-react";

import Loading from "@/app/loading";
import { Heading } from "@/components/heading";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";

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

const OrderListPage = () => {
  return (
    <div className="w-11/12 mx-auto">
      <Heading
        title="Booking List"
        description="Manage All Booking From Here."
        icon={Repeat}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
      />
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};

export default OrderListPage;
