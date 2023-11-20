"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { postData } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";

type ReviewProps = {
  productId: string;
};

type FormValues = {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
};
const WriteReview = ({ productId }: ReviewProps) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState<number>(0);
  const handleRatingChange = (value: number) => {
    setRating(value);
  };
  const { toast } = useToast();
  const form = useForm<FormValues>({});
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    data["userId"] = session?.user.id!;
    data["productId"] = productId;
    data["rating"] = Number(rating);

    if (!session) {
      toast({ title: "Please sign in to add review" });
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    } else {
      try {
        const res: any = await postData(
          "review",
          data,
          session?.backendTokens.accessToken
        );

        if (res?.data.id) {
          toast({ title: "Review Added Successfully" });
        }
      } catch (error: any) {
        toast({ title: error.message });
      }
    }
  };

  return (
    <Card className="w-8/12 mx-auto my-4 text-start">
      <CardHeader>
        <CardTitle className="text-center">Add Your Review</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Rating</p>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            // variant="outline"
            key={value}
            onClick={() => handleRatingChange(value)}
            className={`border-none text-3xl cursor-pointer ${
              value <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            <FaStar />
          </button>
        ))}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              mx-auto mb-0 mt-8 space-y-4
              "
          >
            <div className="my-4">
              <Label className="my-2" title="comment" htmlFor="comment">
                Comment
              </Label>
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="flex justify-end p-0">
              <Button
                className="col-span-12 lg:col-span-2 w-32 my-10"
                type="submit"
                disabled={!isValid || isSubmitting}
                size="icon"
              >
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default WriteReview;
