"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Backend_URL } from "@/lib/Constants";
import { Button } from "../ui/button";

const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.role) {
    return;
  }

  const handleDelete = async () => {
    const res = await fetch(`${Backend_URL}/product/${id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      router.push("/menu");
      toast({ title: "The product has been deleted!" });
    } else {
      const data = await res.json();
      toast({ title: data.message });
    }
  };

  return (
    <Button
      className="bg-red-400 hover:bg-red-500 text-white p-2 rounded-full ml-6"
      onClick={handleDelete}
    >
      <Image src="/delete.png" alt="" width={20} height={20} />
    </Button>
  );
};

export default DeleteButton;
