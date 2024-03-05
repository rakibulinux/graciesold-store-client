"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FileUpload } from "./../file-upload";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./../ui/form";
import { Input } from "./../ui/input";
import { Label } from "./../ui/label";
import { Button } from "./../ui/button";
import { Editor } from "../quil/editor";
import { toast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { patchPutData, postData } from "@/lib/utils";
import { Backend_URL } from "@/lib/Constants";
import UploadImage from "../category/UploadImage";
import { Textarea } from "../ui/textarea";
import UploadProfileImage from "./UploadProfileImage";
import { Profile } from "@/types/types";

type FormValues = {
  address: string;
  bio: string;
  bloodGroup: string;
  gender: string;
  name: string;
  phoneNo: string;
};

type IProfileUpdateProps = {
  urlPath: string;
  user: any;
};
const ProfileUpdate = ({ user, urlPath }: IProfileUpdateProps) => {
  const { data: session } = useSession();
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

  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      name: user?.name || "",
      bio: user?.profile?.bio || "",
    },
  });

  const formIsLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<FormValues> = async (values: any) => {
    try {
      const res: { success: boolean; data: Profile } = await patchPutData(
        "users",
        "me",
        values,
        "PATCH",
        session?.backendTokens?.accessToken!
      );

      if (res.success) {
        await handleUpload(user.profile.id);
        toast({
          title: "Profile Updated Successfully",
        });
        router.push(`${urlPath}`);
      }
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
  };

  const handleUpload = async (id: string) => {
    if (!selectedFile) {
      // Handle the case where no file is selected
      toast({ title: "No file selected", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    const profileId = id;
    console.log(profileId);
    formData.append("file", selectedFile);
    formData.append("profileId", profileId);

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
    <section className="flex items-center justify-center">
      <div className="w-full ">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Update Your Profile
          </h1>
        </div>
        <Label className="my-2" title="profileImg" htmlFor="profileImg">
          Profile Picture
        </Label>
        <UploadProfileImage
          handleFileChange={handleFileChange}
          removeImage={removeImage}
          selectedFile={selectedFile}
          previewImage={previewImage}
          profileImg={
            user?.profile?.profileImg && user?.profile?.profileImg.path
          }
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              mx-auto mb-0 mt-8 space-y-4
              "
          >
            <div className="">
              <div>
                <Label className="my-2" title="name" htmlFor="name">
                  Name
                </Label>
                <FormField
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl>
                        <Input
                          className=" outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                          disabled={formIsLoading}
                          placeholder="name"
                          {...field}
                          type="text"
                          //   value={name}
                          defaultValue={user?.name}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="my-10">
                <Label className="my-2" title="bio" htmlFor="bio">
                  Bio
                </Label>
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          defaultValue={user?.profile?.bio}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Label className="my-2" title="phoneNo" htmlFor="phoneNo">
                  PhoneNo
                </Label>
                <FormField
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl>
                        <Input
                          className=" outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                          disabled={formIsLoading}
                          placeholder="phoneNo"
                          {...field}
                          type="text"
                          defaultValue={user?.profile?.phoneNo}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Label className="my-2" title="address" htmlFor="address">
                  Address
                </Label>
                <FormField
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl>
                        <Input
                          className=" outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                          disabled={formIsLoading}
                          placeholder="address"
                          {...field}
                          type="text"
                          defaultValue={user?.profile?.address}
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
              disabled={formIsLoading}
              size="icon"
            >
              Update Profile
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ProfileUpdate;
