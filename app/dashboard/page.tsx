"use client";
import { getAdminPreferences } from "@/actions/adminPreference.actions";
import {
  getAllLecturerPreferences,
  getLecturerPreference,
} from "@/actions/lecturerPreference.actions";
import { getAllStudentPreferences } from "@/actions/studentPreference.actions";
import CardComponent from "@/components/CardComponent";
import { getSession } from "@/lib/getSession";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Settings2, Users2 } from "lucide-react";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {

  const { data: adminPreferences, isPending: isAdminLoading } = useQuery({
    queryKey: ["admin-preferneces"],
    queryFn: () => getAdminPreferences(),
  });

  const { data: lecturerPreferences, isPending: isLecturerLoading } = useQuery({
    queryKey: ["lecturer-preferences"],
    queryFn: () => getAllLecturerPreferences(),
  });

  const { data: studentsPreferences, isPending: isStudentLoading } = useQuery({
    queryKey: ["student-preferneces"],
    queryFn: () => getAllStudentPreferences(),
  });


  return (
    <div className="w-full h-full flex flex-1">
      <div className="container mx-auto flex-1 py-5 space-y-5">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
            {studentsPreferences!==undefined && (
              <CardComponent
                label="Student Preferences"
                value={studentsPreferences.length}
                icon={<Users2 className="text-muted-foreground" />}
              />
            )}
            {lecturerPreferences && (
              <CardComponent
                label="Lecturer Preferences"
                value={lecturerPreferences.length+0}
                icon={<GraduationCap className="text-muted-foreground" />}
              />
            )}

            {adminPreferences && (
              <CardComponent
                label="Adminstrator Preferences"
                value={adminPreferences.length+0 }
                icon={<Settings2 className="text-muted-foreground" />}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
