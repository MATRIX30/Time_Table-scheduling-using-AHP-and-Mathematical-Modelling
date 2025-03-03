"use client";
import { getPreferences } from "@/actions";
import { Loader, RefreshCw } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import AddPreferenceBtn from "./AddPreferenceBtn";
import DeletePreference from "./DeletePreference";
import { usePreferenceStore } from "@/hooks/use-preferences";

import { useQuery } from "@tanstack/react-query";

type Props = {};

const Preferences = (props: Props) => {
  // const [preferenses, setPreferences] = useState<PrferenceType[]>([]);
  // const [isLoading, setLoading] = useState(false);
  const {
    data: preferences,
    isPending: isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["preferences"],
    queryFn: () => getPreferences(),
    retry: false,
    refetchInterval: 1,
  });

  const { setSelectedPreference, onOpen } = usePreferenceStore();
  const [selectedId, setSelectedId] = useState(null);
  // useEffect(() => {
  //   setLoading(true);
  //   getPreferences()
  //     .then((preferenses) => {
  //       if(preferenses && preferenses.length>0){

  //         setPreferences(preferenses);
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);
  console.log(preferences);

  if (isError) {
    return (
      <div className="flex-1 flex flex-col container mx-auto py-5 font-roboto">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
            Admin Preferences
          </h1>
        </div>
        <div className="flex-1 flex self-center">
          <h1 className="text text-2xl text-red-400">{error.message}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col container mx-auto py-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          Admin Preferences
        </h1>
        {!isLoading && preferences.length > 0 && (
          <AddPreferenceBtn size={"sm"} />
        )}
      </div>
      {isLoading && (
        <div className="flex-1 rounded-sm flex items-center justify-center">
          <Loader className="w-10 h-10 animate-spin" />
        </div>
      )}
      {!isLoading && preferences && preferences.length > 0 && (
        <div className="flex-1 rounded-sm py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-5">
            {preferences.map((pref, index) => (
              <div
                key={index}
                className="shadow-md p-5 rounded-md relative group/preference"
              >
                <p className="text-muted-foreground">
                  Hours Weekend : {pref.courseOnEvening}
                </p>
                <p className="text-muted-foreground">
                  Equilibre Programmation : {pref.courseOnMorning}
                </p>
                <p className="text-muted-foreground">
                  Matiere Multiple Professeurs :{" "}
                  {pref.havingDaysOff}
                </p>
                <p className="text-muted-foreground">UserId : {pref.admin}</p>
                <div className="absolute top-5 right-5 items-center hidden group-hover/preference:flex border rounded-md">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => {
                      onOpen();
                      setSelectedPreference(pref);
                    }}
                    className="rounded-r-none"
                  >
                    <RefreshCw className="w-4 h-4 text-green-500" />
                  </Button>
                  <DeletePreference
                    className="rounded-l-none"
                    preference={pref}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isLoading && preferences && preferences.length === 0 && (
        <div className="flex-1 rounded-sm flex items-center justify-center">
          <div className="flex items-center justify-center flex-col gap-y-3">
            <h1 className="text-2xl font-bold">You have no preferences</h1>
            <AddPreferenceBtn variant="link" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Preferences;
