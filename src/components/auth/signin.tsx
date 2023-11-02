"use client";
import loginImage from "@/assets/login.svg";
import { loginSchema } from "@/schema/login";

import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { signIn } from "next-auth/react";

type FormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log(data);
      const result = await signIn("graciesold-store-api", {
        username: data.email,
        password: data.password,
        redirect: false,
        // callbackUrl: "/",
      });
      // window.location.reload();
      console.log(result);
      if (result?.ok && !result.error) {
        router.push("/");
      }
    } catch (error) {
      console.log(`${error}`);
    }
  };
  return (
    <section className="relative flex flex-wrap lg:h-screen lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="text-white mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Welcome Back!</h1>
        </div>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
              mx-auto mb-0 mt-8 max-w-md space-y-4
              "
            >
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                        disabled={isLoading}
                        placeholder="Email"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                        disabled={isLoading}
                        placeholder="Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className=" col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                SignIn
              </Button>
              <p className="text-sm text-center text-gray-500">
                no account?
                <Link className="underline ml-2" href="/sign-up">
                  Sign Up
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <Image src={loginImage} width={500} alt="login image" />
      </div>
    </section>
  );
};

export default SignIn;
