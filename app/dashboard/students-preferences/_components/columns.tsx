import { ColumnDef } from "@tanstack/react-table";


const columns: ColumnDef<StudentPreference>[] = [
  {
    header: 'ID',
    accessorKey: '_id',
  },
  {
    header: 'Teacher ID',
    accessorKey: 'teacher',
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
