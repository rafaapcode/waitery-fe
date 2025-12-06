import { UsersIcon } from "lucide-react";
import TableProvider from "../../../app/context/TableContext";
import { useUsers } from "../../../app/hooks/queries/useUsers";
import useCreateTable from "../../../app/hooks/useCreateTable";
import { cn } from "../../../app/lib/utils";
import Button from "../../../components/atoms/Button";
import PageHeader from "../../../components/molecules/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/molecules/Table";
import TableSkeleton from "../../../components/TableSkeleton";
import CreateUserModal from "./components/CreateUserModal";
import UsersActionComponent from "./components/UsersActionComponent";
import { useUsersController } from "./useUsersController";

function Users() {
  const {
    createUserModalOpen,
    onCloseCreateUserModal,
    onOpenCreateUserModal,
  } = useUsersController();

  const { users, isFetching } = useUsers({});

  const table = useCreateTable(users?.users || [], [
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
    <main className="w-full h-full">
      <CreateUserModal
        onClose={onCloseCreateUserModal}
        open={createUserModalOpen}
      />
      <PageHeader
        icon={UsersIcon}
        title="Usuários"
        subtitle="Cadastre e gerencie seus usuários."
      />

      <TableProvider table={table}>
        <section className="mt-12">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">
              Usuários{" "}
              <span className="bg-gray-200 px-1 py-0.5 text-sm rounded-md">
                {users?.users.length || 0}
              </span>
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenCreateUserModal}
            >
              Novo Usuário
            </Button>
          </div>
          {isFetching &&  <TableSkeleton />}
          {!isFetching && <div className="w-full mt-4 h-[400px] overflow-y-auto">
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
          </div>}
        </section>
      </TableProvider>
    </main>
  );
}

export default Users;
