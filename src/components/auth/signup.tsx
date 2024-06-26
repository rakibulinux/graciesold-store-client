"use client";
import loginImage from "@/assets/login.svg";
import { registerSchema } from "@/schema/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Backend_URL } from "@/lib/Constants";
import { useToast } from "@/components/ui/use-toast";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const res = await fetch(`${Backend_URL}/auth/sign-up`, {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res?.ok) {
        toast({
          title: "SignUp Successfully! Please Confirm Your Email",
          description: `Your account is registered successfully. Please check your email ${values.email} to verify your account.`,
          variant: "success",
        });
        router.push("/sign-in");
      }
      const data = await res.json();
      if (data?.error?.code === 409001) {
        toast({
          title: data?.error.message,
          description: values.email,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  };
  return (
    <section className="relative flex flex-wrap lg:items-center">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="text-white mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
              mx-auto mb-0 mt-8 max-w-md space-y-4
              "
          >
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <Input
                      className=" outline-none focus-visible:ring-0 focus-visible:ring-transparent "
                      disabled={isLoading}
                      placeholder="Name"
                      {...field}
                      type="name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <Input
                      className="outline-none focus-visible:ring-0 focus-visible:ring-transparent"
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
                  <FormControl>
                    <Input
                      className="outline-none focus-visible:ring-0 focus-visible:ring-transparent"
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
              SignUp
            </Button>
            <p className="text-sm text-center text-gray-500">
              Already have an account?
              <Link className="underline ml-2" href="/sign-in">
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2 md:items-center md:justify-center flex">
        <Image src={loginImage} width={500} alt="login image" />
      </div>
    </section>
  );
};

export default SignUp;
