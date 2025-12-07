import { UsersIcon } from "lucide-react";
import { useUsers } from "../../../app/hooks/queries/useUsers";
import Button from "../../../components/atoms/Button";
import PageHeader from "../../../components/molecules/PageHeader";
import TableSkeleton from "../../../components/TableSkeleton";
import CreateUserModal from "./components/CreateUserModal";
import UsersTable from "./components/UsersTable";
import { useUsersController } from "./useUsersController";

function Users() {
  const { createUserModalOpen, onCloseCreateUserModal, onOpenCreateUserModal } =
    useUsersController();

  const { users, isFetching } = useUsers({});

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

      <section className="mt-12">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">
            Usuários{" "}
            <span className="bg-gray-200 px-1 py-0.5 text-sm rounded-md">
              {users?.users.length || 0}
            </span>
          </h2>
          <Button variant="secondary" size="sm" onClick={onOpenCreateUserModal}>
            Novo Usuário
          </Button>
        </div>
        {isFetching || (!users?.users && <TableSkeleton />)}
        {!isFetching && users?.users && (
          <UsersTable users={users?.users || []} />
        )}
      </section>
    </main>
  );
}

export default Users;
