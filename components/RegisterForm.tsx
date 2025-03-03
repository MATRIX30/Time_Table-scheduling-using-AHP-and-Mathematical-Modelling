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
import { signIn } from "next-auth/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LoaderIcon } from "lucide-react";
import { registerSchema, registerType } from "@/schema/register.schema";
import { createUser } from "@/actions/users.actions";
import { useUserStore } from "@/hooks/user-user";
import toast from "react-hot-toast";
import { useModalStore } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";

type Props = {};

const RegisterForm = (props: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useUserStore();
  const { setOpen } = useModalStore();
  const router = useRouter();

  const form = useForm<registerType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
  });
  const onsubmit = async ({ email, username, password }: registerType) => {
    setIsSubmitting(true);
    try {
      const user = await createUser(email, username, password);
  
      if (typeof user !== "string") {
        console.log(user);
        setUser(user);
        setOpen(false);
        try {
          const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
  
          if (res && res.ok) {
            router.refresh();
            toast.success("Login Successfully");
            if (res.url) {
              const url = new URL(res.url);
              const callbackUrl = url.searchParams.get("callbackUrl");
              if (callbackUrl) {
                const decodedCallbackUrl = decodeURIComponent(callbackUrl);
                router.push(decodedCallbackUrl);
              } else {
                router.push("/dashboard");
              }
            } else {
              router.push("/dashboard");
            }
          } else {
            toast.error("Login failed");
          }
        } catch (error:any) {
          console.error("Error during sign-in:", error);
          toast.error("Sign-in Error: " + error.message);
        }
      } else {
        toast.error("Error: " + user);
      }
    } catch (error:any) {
      console.error("Error during user creation:", error);
      toast.error("User Creation Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-3">
        <div>
          <h1 className="text-2xl font-extrabold">Register</h1>
          <p className="text-sm text-muted-foreground">
            Fill your informations to create an account
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="schedule" {...field} />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
