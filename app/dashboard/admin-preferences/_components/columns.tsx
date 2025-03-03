import DeletePreference from "@/components/DeletePreference";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePreferenceStore } from "@/hooks/use-preferences";
import { AdminstratorPreferenceType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon, SquarePen, Trash2 } from "lucide-react";

const columns: ColumnDef<AdminstratorPreferenceType>[] = [
  {
    header: "ID",
    accessorKey: "_id",
  },
  {
    header: "Course on Morning",
    accessorKey: "courseOnMorning",
  },
  {
    header: "Course on Evening",
    accessorKey: "courseOnEvening",
  },
  {
    header: "Days Off",
    accessorKey: "havingDaysOff",
  },
  {
    header: "Preferred Number of Hours",
    accessorKey: "preferenceNumberOfHours",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const pref = row.original;
  //     const { setSelectedPreference, onOpen } = usePreferenceStore();

  //     return (
  //       <div className="flex">
  //         <Button
  //           className=""
  //           variant={"ghost"}
  //           size={"icon"}
  //           onClick={() => {
  //             onOpen();
  //             setSelectedPreference(pref);
  //           }}
  //         >
  //           <SquarePen className="text-green-500" />
  //         </Button>
  //         <DeletePreference className="rounded-l-none" preference={pref} />
  //       </div>
  //     );
  //   },
  // },
];

export default columns;
