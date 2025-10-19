import { useAuth } from "../app/hooks/useAuth";
import Button from "./atoms/Button";

function UnpermissionlessPage() {
  const { signOut } = useAuth();
  
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      <h1 className="text-gray-900 text-2xl font-medium">
        Você não possui permissão para acessar essa página
      </h1>
      <Button onClick={signOut}>Sair</Button>
    </div>
  );
}

export default UnpermissionlessPage;
