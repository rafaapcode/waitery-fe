import { Building2 } from "lucide-react";

function NotFoundOrgPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="p-6 text-center border-b border-gray-200">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Building2 />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Selecionar Organização
          </h1>
          <p className="text-sm text-gray-600">
            Nenhuma organização foi selecionada. Escolha uma organização
            existente ou crie uma nova.
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundOrgPage;
