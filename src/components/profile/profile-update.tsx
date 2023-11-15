"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

type FormValues = {
  address: string;
  bio: string;
  bloodGroup: string;
  gender: string;
  name: string;
  phoneNo: string;
  profileImg: string;
};

type IProfileUpdateProps = {
  urlPath: string;
  user: any;
};
const ProfileUpdate = ({ user, urlPath }: IProfileUpdateProps) => {
  const { data: session } = useSession();
  const [selectedImage, setSelectedImage] = useState<string>("");

  const onImageUpload = (data: any) => {
    setSelectedImage(data.profileImg);
  };
  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      name: user?.name || "",
      bio: user?.profile?.bio || "",
      profileImg: user?.profile?.profileImg || selectedImage,
    },
  });

  const formIsLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<FormValues> = async (values: any) => {
    values["profileImg"] = selectedImage;
    try {
      const res: { success: boolean } = await patchPutData(
        "users",
        "me",
        values,
        "PATCH",
        session?.backendTokens?.accessToken!
      );
      if (res.success) {
        router.push(`${urlPath}`);
        toast({
          title: "Profile Updated Successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: error.message,
      });
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
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
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
                        <Editor {...field} defaultValue={user?.profile?.bio} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <Label className="my-2" title="profileImg" htmlFor="profileImg">
                  Profile Picture
                </Label>
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="service image"
                    height={100}
                    width={200}
                  />
                ) : (
                  <FileUpload
                    endpoint="profileAttachment"
                    onChange={(url) => {
                      if (url) {
                        onImageUpload({ profileImg: url });
                      }
                    }}
                  />
                )}
              </div>
              <div>
                <Label className="my-2" title="phoneNo" htmlFor="phoneNo">
                  PhoneNo
                </Label>
                <FormField
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
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
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
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
