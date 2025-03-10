"use client";
import { getPreferences } from "@/actions";
import { DataTable } from "@/components/table/DataTable";
import React from "react";
import columns from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import AddPreferenceBtn from "@/components/AddPreferenceBtn";
import { Loader } from "lucide-react";
import { getAdminPreferences } from "@/actions/adminPreference.actions";

type Props = {};

const page = (props: Props) => {
  const {
    data: preferences,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-preferneces"],
    queryFn: () => getAdminPreferences(),
  });

  

  return (
    <div className="flex-1 flex flex-col container mx-auto py-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          Administrator Preferences
        </h1>
        {/* {preferences && <AddPreferenceBtn size={"sm"} />} */}
      </div>
      {/* <Preferences /> */}
      {isPending && (
        <div className="flex-1 flex justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      )}
      {preferences && <DataTable  columns={columns} data={preferences} />}
      {isError && <h3>{error.message}</h3>}
    </div>
  );
};

export default page;
