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
import { CategoryType, SelectOptions } from "@/types/types";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { convertToSlug, postData } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import Categories from "../../categories/categories";
import { Backend_URL } from "@/lib/Constants";
import UploadImages from "@/components/product/UploadImages";
import { revalidatePath } from "next/cache";

type FormValues = {
  name: string;
  description: string;
  price: number;
  availability: "Available" | "Upcoming";
  categoryId: string;
  catSlug: string;
  slug: string;
  isFeatured: boolean;
};

const CreateProduct = ({ category }: any) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategoryId] = useState<string>("");
  const [selectedAvailability, setSelectedAvailability] = useState<
    "Available" | "Upcoming"
  >("Available");
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>(null);

  const getCatSlug: CategoryType = category.find(
    (cat: { id: string }) => cat.id === selectedCategory
  );
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (event.target.files) {
      setImages(event.target.files);
    }

    // Concatenate the newly selected files with the existing ones
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    setFileNames((prevFileNames) => [
      ...prevFileNames,
      ...files.map((file) => file.name),
    ]);

    // Generate preview image URLs for the newly selected files
    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prevPreviews) => [...prevPreviews, ...previewURLs]);
  };

  const removeImage = (index: number) => {
    const updatedFiles = [...selectedFiles];
    const updatedFileNames = [...fileNames];
    const updatedPreviewImages = [...previewImages];

    updatedFiles.splice(index, 1);
    updatedFileNames.splice(index, 1);
    updatedPreviewImages.splice(index, 1);

    setSelectedFiles(updatedFiles);
    setFileNames(updatedFileNames);
    setPreviewImages(updatedPreviewImages);
    setImages((prevImages) => {
      const updatedImages = Array.from(prevImages || []);
      updatedImages.splice(index, 1);
      return updatedImages as unknown as FileList;
    });
  };
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

    data["categoryId"] = selectedCategory;
    data["catSlug"] = getCatSlug.slug;
    data["price"] = price;
    data["availability"] = selectedAvailability;
    data["isFeatured"] = isFeatureds;
    data["slug"] = convertToSlug(data.name);
    if (!images) {
      return toast({
        title: "Insert at least one product image",
        variant: "destructive",
      });
    }
    try {
      const res: any = await postData(
        "product",
        data,
        session?.backendTokens?.accessToken
      );
      if (res) {
        const { id } = res.data;
        await handleUpload(id);
        toast({ title: "Product Created Successfully", variant: "success" });
        setTimeout(() => {
          router.push("/admin/products/");
        }, 3000);
      }
    } catch (error: any) {
      toast({ title: error.message });
    }
  };

  const handleUpload = async (id: string) => {
    const formData = new FormData();
    const productId = id;

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("files", images[i]!);
      }
    }
    formData.append("productId", productId);
    try {
      const response = await fetch(`${Backend_URL}/files/uploads`, {
        method: "POST",
        body: formData,
      });
      await response.json();
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <UploadImages
        handleFileChange={handleFileChange}
        removeImage={removeImage}
        selectedFiles={selectedFiles}
        previewImages={previewImages}
      />
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
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                        disabled={!isValid || isSubmitting}
                        placeholder="name"
                        {...field}
                        type="text"
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
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                        disabled={!isValid || isSubmitting}
                        placeholder="price"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="my-4">
              <FormSelectField
                name="availability"
                label="Availability"
                options={availabilityOptions as SelectOptions[]}
                handleChange={(el: any) => setSelectedAvailability(el)}
              />
            </div>
            <div className="my-4">
              <FormSelectField
                name="isFeatured"
                label="Featured"
                options={isFeaturedProduct as SelectOptions[]}
                handleChange={(el: any) => setIsFeatured(el)}
              />
            </div>
            <div className="my-4">
              <Label className="my-2" title="categoryId" htmlFor="categoryId">
                Category
              </Label>
              <Categories
                name="categoryId"
                label="Category"
                setSelectedCategoryId={(el) => setSelectedCategoryId(el)}
                categoryData={category}
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
                      <Textarea {...field} />
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
            Create Product
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProduct;
