import CardComponent from "@/components/CardComponent";
import { getSession } from "@/lib/getSession";
import { GraduationCap, Settings2, Users2 } from "lucide-react";
import React, {  } from "react";

type Props = {};

const page = async (props: Props) => {
  const session = await getSession()
  console.log(session);
  return (
    <div className="w-full h-full flex flex-1">
      <div className="container mx-auto flex-1 py-5 space-y-5">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
            <CardComponent
              label="Student Preferences"
              value={0}
              icon={<Users2 className="text-muted-foreground" />}
            />
            <CardComponent
              label="Lecturer Preferences"
              value={0}
              icon={<GraduationCap className="text-muted-foreground" />}
            />
            <CardComponent
              label="Adminstrator Preferences"
              value={0}
              icon={<Settings2 className="text-muted-foreground" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
