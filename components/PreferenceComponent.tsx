"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  useState } from "react";
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
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

type PreferenceComponentProps = {
  onSave?: (data: PrferenceType) => void;
};

export default function PreferenceComponent({
  onSave,
}: PreferenceComponentProps) {
  const { selectedPreference: preference } = usePreferenceStore();
  const [isSubmitting,setIsSubmitting] = useState(false)
  const form = useForm<PreferenceType>({
    resolver: zodResolver(PreferenceSchema),
    defaultValues: {
      userId: preference?.userId || 0,
      hoursWeekend: preference?.hoursWeekend || 0,
      equilibreProgrammation: preference?.equilibreProgrammation || 0,
      matiereMultipleProfesseurs: preference?.matiereMultipleProfesseurs || undefined,
    },
    mode: "onChange",
  });

  async function onSubmit(values: PreferenceType) {
    setIsSubmitting(true)
    console.log(values);
    let _preference;
    if(preference){
      _preference = await updatePreference(preference?._id!,values)
      
      }else{
      _preference = await createPreference(values);
    }
    setIsSubmitting(false)
    
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
    if (onSave && preference!==null) {
      onSave(preference);
    }
    window.location.reload()
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
              {preference?._id ? "Update" : "Create"} Model Preferences
            </h1>
            <p className="text-muted-foreground">
              Fill the information below for the admin preference.
            </p>
          </div>
          <div className="grid gap-6 w-full">
            <FormField
              control={form.control}
              name="hoursWeekend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hours per Weekend</FormLabel>
                  <FormControl>
                    <Input
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
                            console.log("Value out of range");
                          }
                        } else {
                          console.log("Invalid input: not a number");
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
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="equilibreProgrammation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programming Equilibrium</FormLabel>
                  <FormControl>
                    <Input
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
                            console.log("Value out of range");
                          }
                        } else {
                          console.log("Invalid input: not a number");
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
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="matiereMultipleProfesseurs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Multiple Professors per Subject</FormLabel>
                  <FormControl>
                    <Input
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
                            console.log("Value out of range");
                          }
                        } else {
                          console.log("Invalid input: not a number");
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
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
                          console.log("Invalid input: not a number");
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
            />
          </div>
          <div className="justify-end">
            <Button disabled={isSubmitting} type="submit">{isSubmitting && <Loader className="w-4 h-4 animate-ping"/>} Save Preferences</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
