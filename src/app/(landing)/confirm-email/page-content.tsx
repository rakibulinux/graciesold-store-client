"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Backend_URL } from "@/lib/Constants";
import { useRouter } from "next/navigation";

type CardProps = React.ComponentProps<typeof Card>;

export function ConfirmEmailContent({ className, ...props }: CardProps) {
  const { toast } = useToast();
  const router = useRouter();
  const params = new URLSearchParams(window?.location?.search);
  const hash = params.get("hash");
  if (!hash) {
    router.push("/");
  }
  const confirmEmail = async () => {
    if (hash) {
      const res = await fetch(`${Backend_URL}/auth/confirm-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hash }),
      });
      if (res.ok) {
        toast({
          title: "Email Confirmed Successfully",
          variant: "success",
        });
      }
      console.log(res);
    }
  };

  return (
    <Card className={cn("w-[380px] mx-auto my-20 py-14", className)} {...props}>
      <CardHeader>
        <CardTitle>Confirm Email</CardTitle>
        <CardDescription>
          Verify your email to signin into your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button onClick={() => confirmEmail()} className="w-full">
          <Check className="mr-2 h-4 w-4" /> Confirm
        </Button>
      </CardContent>
    </Card>
  );
}
