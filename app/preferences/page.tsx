"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { PreferenceModel } from "@/model";
// import { createPreference, Preference } from "@/actions";

export default function PreferencesPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const preference = {
      hoursWeekend: parseInt(data.hoursWeekend as string, 10),
      equilibreProgrammation: parseInt(
        data.equilibreProgrammation as string,
        10
      ),
      matiereMultipleProfesseurs: parseInt(
        data.matiereMultipleProfesseurs as string,
        10
      ),
      userId: parseInt(data.userId as string, 10),
    };
    // await createPreference(preference).then((data) => {
    //   console.log("Data : ", { data });
    // });

    PreferenceModel.create(preference).then(console.log);
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <form method="post" onSubmit={handleSubmit}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Model Preferences</CardTitle>
            <CardDescription>
              Customize your model settings to your liking.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="hours-per-weekend">Hours per Weekend</Label>
              <Input
                id="hours-per-weekend"
                name="hoursWeekend"
                type="number"
                min="0"
                max="10"
                defaultValue="5"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="programming-equilibrium">
                Programming Equilibrium
              </Label>
              <Input
                id="programming-equilibrium"
                name="equilibreProgrammation"
                type="number"
                min="0"
                max="10"
                defaultValue="7"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="multiple-professors">
                Multiple Professors per Subject
              </Label>
              <Input
                id="multiple-professors"
                name="matiereMultipleProfesseurs"
                type="number"
                min="0"
                max="10"
                defaultValue="3"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="user-id">User ID</Label>
              <Input
                id="user-id"
                name="userId"
                type="text"
                placeholder="Enter your user ID"
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit">Save Preferences</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
