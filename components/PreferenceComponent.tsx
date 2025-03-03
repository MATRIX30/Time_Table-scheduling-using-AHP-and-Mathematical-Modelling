"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PreferenceType, PreferenceSchema } from "@/schema/preference.schema";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createPreference, updatePreference } from "@/actions";
import { usePreferenceStore } from "@/hooks/use-preferences";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { getSession } from "@/lib/getSession";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";
import adminPreferenceSchema, { AdminPreferenceType } from "@/schema/adminPreferences.chema";

type PreferenceComponentProps = {
  onSave?: (data: PrferenceType) => void;
};

export default function PreferenceComponent({
  onSave,
}: PreferenceComponentProps) {
  const { selectedPreference: preference } = usePreferenceStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: createPreferenceMutation, isPending: isPreferencePending } =
    useMutation({
      mutationFn: createPreference,
    });

  const form = useForm<AdminPreferenceType>({
    resolver: zodResolver(adminPreferenceSchema),
    defaultValues: {
        courseOnEvening:preference?.courseOnEvening|| 0,
        havingDaysOff:preference?.havingDaysOff||0,
        courseOnMorning:preference?.courseOnMorning||0,
        preferenceNumberOfHours:preference?.preferenceNumberOfHours||0,
    },
    mode: "onChange",
  });

  async function onSubmit(values: AdminPreferenceType) {
    setIsSubmitting(true);
    let _preference;
    let userId = "";
    const session = await getSession();
    if (session) {
      userId = session.user._id!;
    }
    if (preference) {
      _preference = await updatePreference(preference?._id!, {
        ...values,
      });
    } else {
      _preference = await createPreference({ ...values });
    }
    setIsSubmitting(false);

    if (_preference._id) {
      toast("Preference added successfully!", {
        icon: "✔️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      toast.error("Could not add preference!");
    }
    // window.location.reload()
    if (onSave && preference !== null) {
      onSave(preference);
    }
    window.location.reload();
  }

  return (
    <div className="w-full max-w-md">
      <Form {...form}>
        <form
          method="post"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="w-full">
            <h1 className="font-bold text-2xl">
              {preference?._id ? "Update" : "Create"} Admin Preferences
            </h1>
            <p className="text-muted-foreground">
              Fill the information below for the admin preference.
            </p>
          </div>
          <div className="grid gap-6 w-full">
            <FormField
              control={form.control}
              name="courseOnMorning"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course On Morning</FormLabel>
                  <FormControl>
                    <Slider
                      max={10}
                      defaultValue={[preference?.courseOnMorning||0]}
                      step={1}
                      onValueChange={(values) => {
                        if (values.length > 0) {
                          field.onChange(values[0]);
                        }
                      }}
                    />
                    {/* <Input
                      type="number"
                      min="0"
                      max="10"
                      placeholder="Hours per Weekend (0...10)"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numberValue = parseInt(value, 10);

                        // Check if the parsed value is a valid number
                        if (!isNaN(numberValue)) {
                          // Ensure the number is within the specified range
                          if (numberValue >= 0 && numberValue <= 10) {
                            field.onChange(numberValue);
                          } else {
                          }
                        } else {
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        const numberValue = parseInt(value, 10);

                        // If input is invalid or out of range, reset it
                        if (
                          isNaN(numberValue) ||
                          numberValue < 0 ||
                          numberValue > 10
                        ) {
                          field.onChange(undefined);
                        }
                      }}
                    /> */}
                  </FormControl>
                  <FormDescription>{field.value} / 10</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseOnEvening"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course on evening</FormLabel>
                  <FormControl>
                    <Slider
                      max={10}
                      defaultValue={[preference?.courseOnEvening||0]}
                      step={1}
                      onValueChange={(values) => {
                        if (values.length > 0) {
                          field.onChange(values[0]);
                        }
                      }}
                    />
                    {/* <Input
                      type="number"
                      min="0"
                      max="10"
                      placeholder="Programming Equilibrium (0...10)"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numberValue = parseInt(value, 10);

                        // Check if the parsed value is a valid number
                        if (!isNaN(numberValue)) {
                          // Ensure the number is within the specified range
                          if (numberValue >= 0 && numberValue <= 10) {
                            field.onChange(numberValue);
                          } else {
                           
                          }
                        } else {
                          
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        const numberValue = parseInt(value, 10);

                        // If input is invalid or out of range, reset it
                        if (
                          isNaN(numberValue) ||
                          numberValue < 0 ||
                          numberValue > 10
                        ) {
                          field.onChange(undefined);
                        }
                      }}
                    /> */}
                  </FormControl>
                  <FormDescription>{field.value} / 10</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="havingDaysOff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Having Days Off</FormLabel>
                  <FormControl>
                    {/* <Input
                      type="number"
                      min="0"
                      max="10"
                      placeholder="Multiple Professors per Subject (0...10)"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numberValue = parseInt(value, 10);

                        // Check if the parsed value is a valid number
                        if (!isNaN(numberValue)) {
                          // Ensure the number is within the specified range
                          if (numberValue >= 0 && numberValue <= 10) {
                            field.onChange(numberValue);
                          } else {
                          }
                        } else {
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        const numberValue = parseInt(value, 10);

                        // If input is invalid or out of range, reset it
                        if (
                          isNaN(numberValue) ||
                          numberValue < 0 ||
                          numberValue > 10
                        ) {
                          field.onChange(undefined);
                        }
                      }}
                    /> */}
                    <Slider
                      max={10}
                      defaultValue={[preference?.havingDaysOff||0]}
                      step={1}
                      onValueChange={(values) => {
                        if (values.length > 0) {
                          field.onChange(values[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>{field.value} / 10</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferenceNumberOfHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preference Number Of Hours</FormLabel>
                  <FormControl>
                   
                    <Slider
                      max={15}
                      defaultValue={[preference?.preferenceNumberOfHours||0]}
                      step={3}
                      onValueChange={(values) => {
                        if (values.length > 0) {
                          field.onChange(values[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription>{field.value} / 15</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your user ID"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty value to clear the input
                        if (value === "") {
                          field.onChange(undefined);
                          return;
                        }
            
                        const numberValue = parseInt(value, 10);
            
                        // Check if the parsed value is a valid number
                        if (!isNaN(numberValue)) {
                          field.onChange(numberValue);
                        } else {
                          
                        }
                      }}
                      onBlur={(e) => {
                        const value = e.target.value;
                        // Allow empty value to clear the input
                        if (value === "") {
                          field.onChange(undefined);
                          return;
                        }
            
                        const numberValue = parseInt(value, 10);
            
                        // If input is invalid, reset it
                        if (isNaN(numberValue)) {
                          field.onChange(undefined);
                        }
                      }}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <div className="justify-end">
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && <Loader className="w-4 h-4 animate-spin" />} Save
              Preferences
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
