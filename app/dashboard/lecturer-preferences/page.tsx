"use client";
import { getAllLecturerPreferences } from "@/actions/lecturerPreference.actions";
import { DataTable } from "@/components/table/DataTable";
import React from "react";
import columns from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { staticLecturerPreference } from "@/constants";

type Props = {};

const page = (props: Props) => {
  const {
    data: lecturerPreferences,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["lecturer-preferences"],
    queryFn: () => getAllLecturerPreferences(),
  });
  console.log(lecturerPreferences);
  return (
    <div className="flex-1 container mx-auto py-5">
      <h1 className="text-2xl font-bold">Lecturer Preferences</h1>
      {lecturerPreferences && (
        <DataTable
        columns={columns}
        data={lecturerPreferences}
          showSearch={false}
        />
      )}

      {isError && <h1>{error.message}</h1>}

      {isPending && (
        <div>
          <Loader className="animate-spin w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default page;
