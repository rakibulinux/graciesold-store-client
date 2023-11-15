"use client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSession } from "next-auth/react";
import { useToast } from "../ui/use-toast";
import { Backend_URL } from "@/lib/Constants";
import { convertToSlug, postData } from "@/lib/utils";
import UploadImage from "./UploadImage";
import { ChangeEvent, useState } from "react";

type FormValues = {
  name: string;
  slug: string;
};

const CreateCategory = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setFileName(null);
    setPreviewImage(null);
  };

  const form = useForm<FormValues>({});

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!selectedFile) {
      return toast({
        title: "Insert at least one product image",
        variant: "destructive",
      });
    }
    data["slug"] = convertToSlug(data.name);
    try {
      const res: any = await postData(
        "category",
        data,
        session?.backendTokens?.accessToken
      );
      if (res) {
        const { id } = res.data;
        await handleUpload(id);
        toast({ title: "Category Created Successfully", variant: "success" });
        setTimeout(() => {
          router.push("/admin/categories/");
        }, 3000);
      }
    } catch (error: any) {
      toast({ title: error.message });
    }
  };
  const handleUpload = async (id: string) => {
    if (!selectedFile) {
      // Handle the case where no file is selected
      toast({ title: "No file selected", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    const categoryId = id;

    formData.append("file", selectedFile);
    formData.append("categoryId", categoryId);

    try {
      const response = await fetch(`${Backend_URL}/files/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({ title: "File uploaded successfully", variant: "success" });
      } else {
        const data = await response.json();
        toast({ title: data.message, variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="w-11/12 mx-auto">
      <UploadImage
        handleFileChange={handleFileChange}
        removeImage={removeImage}
        selectedFile={selectedFile}
        previewImage={previewImage}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
              mx-auto mb-0 mt-8 space-y-4
              "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      />
                    </FormControl>
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
            Create Category
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateCategory;
