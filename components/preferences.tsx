"use client";
import { getPreferences } from "@/actions";
import { Loader, Plus, RefreshCw, TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import AddPreferenceBtn from "./AddPreferenceBtn";
import DeletePreference from "./DeletePreference";
import { usePreferenceStore } from "@/hooks/use-preferences";

type Props = {};

const Preferences = (props: Props) => {
  const [preferenses, setPreferences] = useState<PrferenceType[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { setSelectedPreference,onOpen } = usePreferenceStore();
  useEffect(() => {
    setLoading(true);
    getPreferences()
      .then((preferenses) => {
        setPreferences(preferenses);
      })
      .finally(() => setLoading(false));
  }, []);
  console.log(preferenses);
  return (
    <div className="flex-1 flex flex-col container mx-auto py-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
          Admin Preferences
        </h1>
        {!isLoading && preferenses.length > 0 && (
          <AddPreferenceBtn size={"sm"} />
        )}
      </div>
      {isLoading && (
        <div className="flex-1 rounded-sm flex items-center justify-center">
          <Loader className="w-10 h-10 animate-spin" />
        </div>
      )}
      {!isLoading && preferenses.length > 0 && (
        <div className="flex-1 rounded-sm py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-5">
            {preferenses.map((pref,index) => (
              <div key={index} className="shadow-md p-5 rounded-md relative group/preference">
                <p className="text-muted-foreground">
                  Hours Weekend : {pref.hoursWeekend}
                </p>
                <p className="text-muted-foreground">
                  Equilibre Programmation : {pref.equilibreProgrammation}
                </p>
                <p className="text-muted-foreground">
                  Matiere Multiple Professeurs :{" "}
                  {pref.matiereMultipleProfesseurs}
                </p>
                <p className="text-muted-foreground">UserId : {pref.userId}</p>
                <div className="absolute top-5 right-5 items-center gap-2 hidden group-hover/preference:flex">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => {
                      onOpen()
                      setSelectedPreference(pref)
                    }}
                  >
                    <RefreshCw className="w-5 h-5 text-green-500" />
                  </Button>
                  <DeletePreference preference={pref} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isLoading && preferenses.length === 0 && (
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
