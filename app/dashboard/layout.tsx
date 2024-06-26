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
