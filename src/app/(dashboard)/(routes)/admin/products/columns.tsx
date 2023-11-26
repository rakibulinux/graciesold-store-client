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
import { Preview } from "@/components/quil/preview";
import { ProductType } from "@/types/types";
import { AlertDialogModal } from "@/components/alart-dialog";
import { useSession } from "next-auth/react";
import { deleteData } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Backend_URL } from "@/lib/Constants";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Image
          src={Backend_URL + product?.images[0]?.path} // Make sure "image" is a valid path to your image
          alt={product.name} // Use the appropriate alt text
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
          Name
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: session } = useSession();
      const product = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { toast } = useToast();
      const deleteProduct = async (id: string) => {
        const res = await deleteData(
          "product",
          product.id,
          session?.backendTokens?.accessToken!
        );
        if (res) {
          toast({
            title: `This ${product.name} Product Has been Deleted Successfully!`,
          });
        }
      };
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
              onClick={() => navigator.clipboard.writeText(product.id)}
            >
              Copy product ID
            </DropdownMenuItem>
            <Link href={`/admin/products/edit/${product.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <Link href={`/admin/products/details/${product.id}`}>
              <DropdownMenuItem>Details</DropdownMenuItem>
            </Link>
            <AlertDialogModal
              title="Delete"
              handleDelete={() => deleteProduct(product.id)}
            />
            <DropdownMenuSeparator />

            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
