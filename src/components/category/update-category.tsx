"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CategoryType } from "@/types/types";
import { Backend_URL } from "@/lib/Constants";
import { useSession } from "next-auth/react";
import { convertToSlug } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";

type FormValues = {
  name: string;
  description: string;
};
type CategoryValues = {
  category: CategoryType;
};

const UpdateCategory = ({ category }: CategoryValues) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<FormValues>({});

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const slug = convertToSlug(data.name);
    console.log(data);
    try {
      const res = await fetch(`${Backend_URL}/category/${category?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.backendTokens?.accessToken}`,
        },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          slug,
        }),
      });
      //console.log(res);
      if (res?.ok) {
        router.push("/admin/categories");
        toast({ title: "Category Updated Successfully" });
      }
    } catch (error) {
      console.log(`${error}`);
    }
  };
  return (
    <div className="w-11/12 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
              mx-auto mb-0 mt-8 space-y-4
              "
        >
          <div>
            <div>
              <Label className="my-2" title="name" htmlFor="name">
                Category Name
              </Label>
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                        disabled={isLoading}
                        placeholder="name"
                        {...field}
                        type="text"
                        defaultValue={category?.name}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="my-4">
              <Label className="my-2" title="description" htmlFor="description">
                Description
              </Label>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        defaultValue={category.description}
                        placeholder="Write Category Description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            className=" col-span-12 lg:col-span-2 w-full"
            type="submit"
            disabled={isLoading}
            size="icon"
          >
            Update Category
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateCategory;
