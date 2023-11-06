"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const service = row.original;
      console.log(service);
      return (
        <Image
          src={service.image} // Make sure "image" is a valid path to your image
          alt={service.name} // Use the appropriate alt text
          width={100} // Customize the width of the image
          height={100} // Customize the height of the image
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      //console.log(column);
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // cell: ({ row }) => {
    //   const service = row.original?.services;
    //   return <p>{service.name.slice(0, 50)}</p>;
    // },
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  //   cell: ({ row }) => {
  //     return <div>{row.original.?.slice(0, 50)}</div>;
  //   },
  // },

  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "date",
    header: "Order At",
    // cell: ({ row }) => {
    //   const date = new Date(row.getValue("date"));
    //   const formatted = date.toLocaleDateString();
    //   return <div className="font-medium">{formatted}</div>;
    // },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;
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
            // onClick={() => navigator.clipboard.writeText(service.id)}
            >
              Copy Booking ID
            </DropdownMenuItem>
            <Link href={`/admin/bookings/edit/`}>
              <DropdownMenuItem>Update</DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem> */}
            {/* <DialogCloseButton
                handleDelete={() => deleteService(service.id)}
              /> */}
            {/* </DropdownMenuItem> */}
            <DropdownMenuSeparator />

            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
