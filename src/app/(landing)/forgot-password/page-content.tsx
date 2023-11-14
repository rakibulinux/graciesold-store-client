"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Backend_URL } from "@/lib/Constants";
import { cn } from "@/lib/utils";
import { forgotPasswordSchema } from "@/schema/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Check } from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email adress."),
});
type FormValues = {
  email: string;
};
type CardProps = React.ComponentProps<typeof Card>;
const ForgotPasswordPage = ({ className, ...props }: CardProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await fetch(`${Backend_URL}/auth/forgot-password`, {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res?.ok) {
        toast({
          title: "Reset Link Send In Youe Email Successfully!",
          description: `Please check your email ${data.email} to rest your password.`,
          variant: "success",
        });
        router.push("/");
      }
    } catch (error: any) {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Card className={cn("w-[380px] mx-auto my-10 py-6", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          We will send a password rest link in your email.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="
              mx-auto mb-0 mt-8 max-w-md space-y-4
              "
        >
          <CardContent className="grid gap-4">
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      error={form.formState.errors.email?.message}
                      label="Email"
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
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </CardFooter>
          <p className="text-sm text-center text-gray-500">
            Do You Remember Your Password?
            <Link className="underline ml-2" href="/sign-in">
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </Card>
  );
};

export default ForgotPasswordPage;
