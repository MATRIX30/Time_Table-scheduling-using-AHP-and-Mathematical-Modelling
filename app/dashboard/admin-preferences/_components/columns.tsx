import { ColumnDef } from "@tanstack/react-table";


const columns: ColumnDef<AdminstratorPreferenceType>[] = [
  {
    header: 'ID',
    accessorKey: '_id',
  },
  {
    header: 'Admin ID',
    accessorKey: 'admin',
  },
  {
    header: 'Course on Morning',
    accessorKey: 'courseOnMorning',
  },
  {
    header: 'Course on Evening',
    accessorKey: 'courseOnEvening',
  },
  {
    header: 'Days Off',
    accessorKey: 'havingDaysOff',
  },
  {
    header: 'Preferred Number of Hours',
    accessorKey: 'PreferenceNumberOfHours',
  },
];

export default columns;
