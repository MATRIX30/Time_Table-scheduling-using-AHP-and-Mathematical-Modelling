"use client"
import { getAllStudentPreferences } from '@/actions/studentPreference.actions';
import { DataTable } from '@/components/table/DataTable';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React from 'react'
import columns from './_components/columns';

type Props = {}

const page = (props: Props) => {
  const {
    data: preferences,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["student-preferneces"],
    queryFn: () => getAllStudentPreferences(),
  });
  return (
    <div className="flex-1 flex flex-col container mx-auto py-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          Student Preferences
        </h1>
        
      </div>
      {/* <Preferences /> */}
      {isPending && (<div className="flex-1 flex justify-center items-center">
        <Loader className="animate-spin"/>
      </div>)}
      {preferences && <DataTable columns={columns} data={preferences} />}
      {isError && <h3>{error.message}</h3>}
    </div>
  )
}

export default page