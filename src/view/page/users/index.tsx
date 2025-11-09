import { UsersIcon } from "lucide-react";
import TableProvider from "../../../app/context/TableContext";
import type { User } from "../../../app/entities/User";
import { UserRole } from "../../../app/entities/User";
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
import CreateUserModal from "./components/CreateUserModal";
import UsersActionComponent from "./components/UsersActionComponent";
import { useUsersController } from "./useUsersController";

const users: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@email.com",
    role: UserRole.ADMIN,
    cpf: "123.456.789-00",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    role: UserRole.WAITER,
    cpf: "234.567.890-11",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    role: UserRole.WAITER,
    cpf: "345.678.901-22",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    role: UserRole.WAITER,
    cpf: "456.789.012-33",
  },
  {
    id: "5",
    name: "Carlos Ferreira",
    email: "carlos.ferreira@email.com",
    role: UserRole.ADMIN,
    cpf: "567.890.123-44",
  },
  {
    id: "6",
    name: "Juliana Almeida",
    email: "juliana.almeida@email.com",
    role: UserRole.WAITER,
    cpf: "678.901.234-55",
  },
  {
    id: "7",
    name: "Roberto Lima",
    email: "roberto.lima@email.com",
    role: UserRole.WAITER,
    cpf: "789.012.345-66",
  },
];

function Users() {
  const {
    createUserModalOpen,
    onCloseCreateUserModal,
    onOpenCreateUserModal
  } = useUsersController();

  const table = useCreateTable(users, [
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
                {users.length}
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
        </section>
      </TableProvider>
    </main>
  );
}

export default Users;
