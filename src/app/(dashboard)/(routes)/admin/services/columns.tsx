"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AlertDialogModal } from "@/components/alart-dialog";
import { Preview } from "@/components/preview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UseDeleteServiceMutation } from "@/redux/api/serviceApi";
import { IService } from "@/types";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<IService>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const service = row.original;
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
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <Preview value={row.original.description?.slice(0, 50)!} />;
    },
  },

  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "availability",
    header: "Availability",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const service = row.original;
      const [deleteService] = UseDeleteServiceMutation();
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
              onClick={() => navigator.clipboard.writeText(service.id)}
            >
              Copy Service ID
            </DropdownMenuItem>
            <Link href={`/admin/services/edit/${service.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <Link href={`/admin/services/details/${service.id}`}>
              <DropdownMenuItem>Details</DropdownMenuItem>
            </Link>
            {/* <DropdownMenuItem> */}
            {/* <DialogCloseButton
                handleDelete={() => deleteService(service.id)}
              /> */}
            <AlertDialogModal
              title="Delete"
              handleDelete={() => deleteService(service.id)}
            />
            {/* </DropdownMenuItem> */}
            <DropdownMenuSeparator />

            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
