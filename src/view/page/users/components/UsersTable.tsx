import TableProvider from "../../../../app/context/TableContext";
import type { User, UserRole } from "../../../../app/entities/User";
import { useAuth } from "../../../../app/hooks/useAuth";
import useCreateTable from "../../../../app/hooks/useCreateTable";
import { cn } from "../../../../app/lib/utils";
import Badget from "../../../../components/atoms/Badget";
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
  const { isAdmin, isWaiter } = useAuth();

  const badgetVariant = (role?: UserRole) => isAdmin(role) ? "primary" : isWaiter(role) ? "error" : "default";

  const table = useCreateTable(users || [], [
    { accessorKey: "name", header: "Nome" },
    { accessorKey: "email", header: "E-mail" },
    { accessorKey: "role", header: "Cargo", cell: ({ row }) => <Badget variant={badgetVariant(row.original.role)}>{row.original.role}</Badget> },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => <UsersActionComponent user={row.original} />,
    },
  ]);

  return (
    <TableProvider table={table}>
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
    </TableProvider>
  );
}

export default UsersTable;
