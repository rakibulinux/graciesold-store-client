"use client";
import { availabilityOptions, isFeaturedProduct } from "@/constants/global";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormSelectField from "@/components/forms/FormSelectField";
import { SelectOptions } from "@/types/types";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { convertToSlug, patchPutData, postData } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { Backend_URL } from "@/lib/Constants";
import UploadImages from "@/components/product/UploadImages";
import Categories from "../../../categories/categories";

type FormValues = {
  name: string;
  description: string;
  price: number;
  availability: "Available" | "Upcoming";
  categoryId: string;
  slug: string;
  isFeatured: boolean;
};

const UpdateProduct = ({ product }: any) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  //console.log(product);
  const [selectedAvailability, setSelectedAvailability] = useState<
    "Available" | "Upcoming"
  >("Available");
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  const router = useRouter();
  const form = useForm<FormValues>({});
  const { isSubmitting, isValid } = form.formState;

  // Upload file in upload thing
  // const onImageUpload = (data: any) => {
  //   setSelectedImage(data.image);
  // };
  // const handleFileChange = (e: any) => {
  //   setImages(e.target.files);
  // };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const price = Number(data.price);
    const isFeatureds = Boolean(isFeatured);

    data["price"] = price || product.price;
    data["availability"] = selectedAvailability || product.availability;
    data["isFeatured"] = isFeatureds || product.isFeatured;
    data["slug"] = convertToSlug(data.name) || product.slud;

    try {
      const res: any = await patchPutData(
        "product",
        product.id,
        data,
        "PATCH",
        session?.backendTokens?.accessToken!
      );
      if (res) {
        toast({ title: "Product Updated Successfully", variant: "success" });
        setTimeout(() => {
          router.push("/admin/products/");
        }, 3000);
      }
    } catch (error: any) {
      toast({ title: error.message });
    }
  };
  //console.log(product.isFeatured, product.availability);
  return (
    <div className="w-11/12 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
              mx-auto mb-0 mt-8 space-y-4
              "
        >
          <div className="">
            <div className="my-4">
              <Label className="my-2" title="name" htmlFor="name">
                Product Name
              </Label>
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl>
                      <Input
                        className="outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                        disabled={!isValid || isSubmitting}
                        placeholder="name"
                        {...field}
                        type="text"
                        defaultValue={product?.name}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="my-4">
              <Label className="my-2" title="Price" htmlFor="price">
                Price
              </Label>
              <FormField
                name="price"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl>
                      <Input
                        className="outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                        disabled={!isValid || isSubmitting}
                        placeholder="price"
                        {...field}
                        type="text"
                        defaultValue={product?.price}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="my-4">
              <FormSelectField
                name={product?.availability}
                label="Availability"
                options={availabilityOptions as SelectOptions[]}
                handleChange={(el: any) => setSelectedAvailability(el)}
                defaultValue={product?.availability}
              />
            </div>
            <div className="my-4">
              <FormSelectField
                name={
                  product?.isFeatured.toString().charAt(0).toUpperCase() +
                  product?.isFeatured.toString().slice(1)
                }
                label="Featured"
                options={isFeaturedProduct as SelectOptions[]}
                handleChange={(el: any) => setIsFeatured(el)}
                defaultValue={product?.isFeatured}
              />
            </div>
            {/* <div className="my-4">
              <Label className="my-2" title="categoryId" htmlFor="categoryId">
                Category
              </Label>
              <Categories
                name="categoryId"
                label="Category"
                setSelectedCategoryId={(el) => setSelectedCategoryId(el)}
                categoryData={category}
                defaultValue={product?.categoryId} 
              />
            </div> */}
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
                        defaultValue={product?.description}
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
            disabled={!isValid || isSubmitting}
            size="icon"
          >
            Update Product
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateProduct;
