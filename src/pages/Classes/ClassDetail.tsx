import { Navbar } from "@/components/layout";
import React from "react";
import { useParams } from "react-router-dom";

const ClassDetail = () => {
  const {classN} = useParams();
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto py-5 space-y-5">
          <h1 className="text-2xl xl:text-3xl">Class : {classN}</h1>
        </div>
      </main>
    </div>
  );
};

export default ClassDetail;
