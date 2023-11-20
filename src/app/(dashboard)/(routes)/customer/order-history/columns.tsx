/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, Check, MoreHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Backend_URL } from "@/lib/Constants";
import OrderDetails from "@/components/order-details";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { OrderType } from "@/types/types";
import Link from "next/link";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "order_number",
    header: "Order Number",
  },
  {
    accessorKey: "paymentStatus",
    header: "PAID",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div>
          {!order.paymentStatus ? (
            <Check className="text-green-600" />
          ) : (
            <Link
              className="p-2 bg-red-500 text-white rounded-md"
              href={`/pay/${order.id}`}
            >
              Pay Now
            </Link>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "intent_id",
    header: "Payment Token",
  },
  {
    accessorKey: "status",
    header: "Delivered",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <p>
          {status === "pending" ? (
            <p className="text-red-400 bg-red-200 py-1 px-2 rounded-md hover:text-red-500 hover:bg-red-300">
              Pending
            </p>
          ) : (
            <Check className="text-green-600" />
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Details",
    cell: ({ row }) => {
      const order = row.original;

      return <OrderDetails order={order} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Order Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id)}
            >
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
