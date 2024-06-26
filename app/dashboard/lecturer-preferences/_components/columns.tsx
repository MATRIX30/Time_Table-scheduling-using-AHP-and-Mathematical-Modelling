import { ColumnDef } from "@tanstack/react-table";


const columns: ColumnDef<LecturerPreferenceType>[] = [
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
    header: 'Having Days Off',
    accessorKey: 'havingDaysOff',
  },
  {
    header: 'Preferred Number of Hours',
    accessorKey: 'preferenceNumberOfHours',
  },
];

export default columns;
