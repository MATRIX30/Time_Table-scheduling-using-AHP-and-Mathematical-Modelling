"use client";
import { getPreferences } from "@/actions";
import Preferences from "@/components/preferences";
import { DataTable } from "@/components/table/DataTable";
import React from "react";
import columns from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import AddPreferenceBtn from "@/components/AddPreferenceBtn";
import { Loader } from "lucide-react";

type Props = {};

const page = (props: Props) => {
  const {
    data: preferences,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["admin-preferneces"],
    queryFn: () => getPreferences(),
  });

  return (
    <div className="flex-1 flex flex-col container mx-auto py-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          Admin Preferences
        </h1>
        {preferences && preferences.length > 0 && (
          <AddPreferenceBtn size={"sm"} />
        )}
      </div>
      {/* <Preferences /> */}
      {isPending && (<div className="flex-1 flex justify-center items-center">
        <Loader className="animate-spin"/>
      </div>)}
      {preferences && <DataTable columns={columns} data={preferences} />}
      {isError && <h3>{error.message}</h3>}
    </div>
  );
};

export default page;
