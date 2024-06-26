import React, { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "./ui/button";
import { LogInIcon } from "lucide-react";
import LoginForm from "./LoginForm";
import { useModalStore } from "@/hooks/use-modal";
import RegisterForm from "./RegisterForm";
import { useUserStore } from "@/hooks/user-user";
import { cn } from "@/lib/utils";

type Props = {};

const LoginBtn = (props: Props) => {
  const { isOpen, setOpen } = useModalStore();
  const { user } = useUserStore();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        setOpen(value);
      }}
    >
      <DialogTrigger asChild className={cn("", { "hidden": user !== null })}>
        <Button
          size={"sm"}
          onClick={() => setOpen(true)}
          variant={"ghost"}
          className="rounded-full border"
        >
          <LogInIcon className="w-4 h-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Login</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        hideCloseButton={false}
        forceMount
        className="max-w-sm lg:max-w-md "
      >
        <Tabs defaultValue="login" className="w-full my-2">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger className="w-full" value="register">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginBtn;
