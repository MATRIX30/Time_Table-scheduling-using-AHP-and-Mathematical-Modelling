import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePreferenceStore } from "@/hooks/use-preferences";

type Props = {
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
};

const AddPreferenceBtn = ({ className, variant, size }: Props) => {
  const {setOpen} = usePreferenceStore();
  
  return (
    <Button
      variant={variant || "outline"}
      size={size || "lg"}
      className={cn("items-center flex capitalize font-roboto", className)}
      onClick={() => setOpen(true)}
    >
      <Plus className="w-5 h-5 mr-2" />
      <span>preference</span>
    </Button>
  );
};

export default AddPreferenceBtn;
