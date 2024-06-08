import { Navbar } from "@/components/layout";
import { SUBJECTS } from "@/data/subjects";
import React from "react";
import { Link } from "react-router-dom";


type Props = {};

const Classes = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto py-5 space-y-5">
          <h1 className="text-2xl xl:text-3xl">Classes</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(SUBJECTS.facultes.sciences.filiere).map(
              (data, index) => {
                const _data = Object.entries(data[1]);
                const className = data[0];
                const niveau = Object.entries(_data[0][1]);
                console.log({ niveau });
                return (
                  <Link to={`/classes/${className}`}>
                    <div
                      key={index}
                      className="shadow-md border rounded-sm p-5 cursor-pointer text-muted-foreground"
                    >
                      <h1>{className}</h1>
                      <div>
                        <span>Levels : {niveau.length}</span>
                      </div>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Classes;
