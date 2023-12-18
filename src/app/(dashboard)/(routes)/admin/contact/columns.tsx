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
import { Contact } from "@/types/types";
import { AlertDialogModal } from "@/components/alart-dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteData } from "@/lib/utils";
import { useSession } from "next-auth/react";

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      //console.log(column);
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
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "message",
    header: "Message",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data: session } = useSession();
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { toast } = useToast();
      const deleteContact = async (id: string) => {
        const res = await deleteData(
          "contact",
          contact.id,
          session?.backendTokens?.accessToken!
        );
        if (res) {
          toast({
            title: `This ${contact.name} contact Has been Deleted Successfully!`,
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
              onClick={() => navigator.clipboard.writeText(contact.id)}
            >
              Copy Contact ID
            </DropdownMenuItem>
            <AlertDialogModal
              title="Delete"
              handleDelete={() => deleteContact(contact.id)}
            />
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
