"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import { useUserStore } from "@/hooks/user-user";
import { useRouter } from "next/navigation";
import { getUserFromLocalStorage } from "@/lib/getUserFromLocalStorage";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  console.log(sidebarRef.current);
  const router = useRouter();

  const handleResize = (e: UIEvent) => {
    console.log(e);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  },[]);
  // const user = getUserFromLocalStorage();
  // useEffect(() => {
  //   if (!user) {
  //     router.replace("/");
  //   }
  // }, [user, router]);

  // if (!user) {
  //   return <div>Loading...</div>;
  // }
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-screen w-full font-roboto"
    >
      <ResizablePanel
        className="hidden md:flex"
        defaultSize={18}
        minSize={14}
        maxSize={18}
      >
        <div className="flex h-full w-full" ref={sidebarRef}>
          <Sidebar />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle={false} />
      <ResizablePanel defaultSize={100 - 18}>
        <div className="flex flex-col h-full w-full">
          <Header />
          {children}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default layout;
