import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { deletePreference } from "@/actions";
import { cn } from "@/lib/utils";

type Props = {
  preference: PrferenceType;
  className?:string;
};

const DeletePreference = ({ preference,className }: Props) => {
  const handleDelete = async () => {
    const promise = await deletePreference(preference._id!);
    toast.success("Preference deleted successfully")
    window.location.reload()
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className={cn("")}>
          <TrashIcon className={cn("text-red-400",className)} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            preference.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePreference;
