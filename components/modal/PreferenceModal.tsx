"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import PreferenceComponent from "../PreferenceComponent";
import { usePreferenceStore } from "@/hooks/use-preferences";
import { revalidatePage } from "@/actions";

const PreferenceModal = () => {
  const router = useRouter();
  const { open, setOpen } = usePreferenceStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <PreferenceComponent
          onSave={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PreferenceModal;
