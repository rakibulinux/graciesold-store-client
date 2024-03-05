"use client";
import PasswordStrength from "@/components/auth/PasswordStrength";
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
import { toast, useToast } from "@/components/ui/use-toast";
import { Backend_URL } from "@/lib/Constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { passwordStrength } from "check-password-strength";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import TogglePassword from "@/components/auth/TogglePassword";

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters.")
      .max(52, "Password must be less than 52 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });
type InputType = z.infer<typeof FormSchema>;
type FormValues = {
  password: string;
  confirmPassword: string;
};
type CardProps = React.ComponentProps<typeof Card>;

const ChangePassword = ({ className, ...props }: CardProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [passStrength, setPassStrength] = useState<number>(0);
  const { toast } = useToast();
  const router = useRouter();
  const params = new URLSearchParams(window?.location?.search);
  const hash = params.get("hash");
  const form = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = form;
  const isLoading = form.formState.isSubmitting;
  useEffect(() => {
    setPassStrength(
      passwordStrength(watch().password ? watch().password : "").id
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch().password]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await fetch(`${Backend_URL}/auth/reset-password`, {
        method: "POST",
        body: JSON.stringify({
          hash,
          password: data.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res?.ok) {
        toast({
          title: "Reset successfully",
          description: `Your Password Has Been Rest successfully!`,
          variant: "success",
        });
        router.push("/sign-in");
      }
    } catch (error: any) {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Card className={cn("w-[380px] mx-auto my-20 py-14", className)} {...props}>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          We will send a password rest link in your email.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
              mx-auto mb-0 mt-8 max-w-md space-y-4
              "
        >
          <CardContent className="grid gap-4">
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <Input
                      label="Password"
                      error={errors.password?.message}
                      type={showPass ? "text" : "password"}
                      className="outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                      disabled={isLoading}
                      placeholder="Password"
                      {...field}
                    >
                      <TogglePassword
                        className="absolute right-6 top-9"
                        setValue={setShowPass}
                        value={showPass}
                      />
                    </Input>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <Input
                      label="Confirm Password"
                      error={errors.confirmPassword?.message}
                      type={showPass ? "text" : "password"}
                      className="outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-2"
                      disabled={isLoading}
                      placeholder="Confirm Password"
                      {...field}
                    >
                      <TogglePassword
                        className="absolute right-6 top-9"
                        setValue={setShowPass}
                        value={showPass}
                      />
                    </Input>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <PasswordStrength passStrength={passStrength} />
          <CardFooter>
            <Button type="submit" className="w-full">
              <Check className="mr-2 h-4 w-4" /> Set new password
            </Button>
          </CardFooter>
          <p className="text-sm text-center text-gray-500">
            Already have an account?
            <Link className="underline ml-2" href="/sign-in">
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </Card>
  );
};

export default ChangePassword;
