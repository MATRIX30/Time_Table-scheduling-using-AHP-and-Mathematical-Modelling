"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, loginType } from "@/schema/login.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderIcon } from "lucide-react";
import { loginUser } from "@/actions/users.actions";
import toast from "react-hot-toast";
import { useUserStore } from "@/hooks/user-user";
import { useModalStore } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {};

const LoginForm = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useUserStore();
  const { setOpen } = useModalStore();
  const router = useRouter()
  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onsubmit = async ({ email, password }: loginType) => {
    setIsSubmitting(true);
    const res = await signIn("credentials", { email,password, redirect: false })
    if (res && res.ok) {
      router.refresh()
      toast.success("Login Successfully");
      
      if (res.url) {
          const url = new URL(res.url);
          const callbackUrl = url.searchParams.get('callbackUrl');
          if (callbackUrl) {
              const decodedCallbackUrl = decodeURIComponent(callbackUrl);

              router.push(decodedCallbackUrl)
          }
          else {
              router.push("/dashboard")
          }
      }

  }
  else{
    toast.error("Email or password incorrect");

  }
  setIsSubmitting(false);

  //   const user = await loginUser(email, password);
  //   if (user) {
  //     setUser(user);
  //     toast.success("Login Successfully");
  //     setOpen(false)
  //     router.push("/dashboard")

  //   } else {
  //     toast.error("Email or password incorrect");
  //   }
  //   setIsSubmitting(false);

  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-3">
        <div>
          <h1 className="text-2xl font-extrabold">Login</h1>
          <p className="text-sm text-muted-foreground">
            Fill your informations to login
          </p>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="support@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {" "}
          {isSubmitting && (
            <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
          )}{" "}
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
