"use client";
import { toast } from "./ui/use-toast";

export const ShowMeToast = async (res: any) => {
  console.log(res);
  if (res.status == 401) {
    toast({
      title: res.statusText,
    });
    return null;
  }
};
