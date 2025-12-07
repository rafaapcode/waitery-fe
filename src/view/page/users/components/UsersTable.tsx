import type { User } from "../../../../app/entities/User";
import useCreateTable from "../../../../app/hooks/useCreateTable";
import { cn } from "../../../../app/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/molecules/Table";
import UsersActionComponent from "./UsersActionComponent";

interface UsersTableProps {
  users: User[];
}

function UsersTable({ users }: UsersTableProps) {
  const table = useCreateTable(users || [], [
    { accessorKey: "name", header: "Nome" },
    { accessorKey: "email", header: "E-mail" },
    { accessorKey: "role", header: "Cargo" },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => <UsersActionComponent user={row.original} />,
    },
  ]);

  return (
    <div className="w-full mt-4 h-[400px] overflow-y-auto">
      <Table className="w-full h-full border border-gray-300 shadow">
        <TableHeader className="bg-gray-100 rounded-md">
          {table.headerGroups.map((headerGroup) => (
            <TableRow className="border-none" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isActionHeader = header.isHeader("actions");

                const headerStyle = cn(isActionHeader && "text-right");

                return (
                  <TableHead key={header.id} className={headerStyle}>
                    {header.headerTitle}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.rows.map((row) => (
            <TableRow key={row.id} className="border-b border-gray-300">
              {row.cells.map((cell) => (
                <>
                  <TableCell key={cell.id} className="p-3">
                    {cell.value}
                  </TableCell>
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UsersTable;
