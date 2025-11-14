import { Building2, CirclePlus } from "lucide-react";
import Button from "../../../../components/atoms/Button";
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../../../components/molecules/Select";
import CreateOrgModal from "./CreateOrgModal";
import { useNotFoundOrgController } from "./useNotFoundOrgController";

function NotFoundOrgPage() {
  const { selectedOrganization, handleSelectOrganization, toggleHandleCreateNew, createNewOrg} = useNotFoundOrgController();

  return (
    <div className="w-1/2 h-full mx-auto flex flex-col justify-center items-center">
      <CreateOrgModal 
        onClose={toggleHandleCreateNew}
        open={createNewOrg}
      />

      <div className="p-6 text-center border-b border-gray-200">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Building2 />
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Selecionar Organização
        </h1>
        <p className="text-sm text-gray-600">
          Nenhuma organização foi selecionada. Escolha uma organização existente
          ou crie uma nova.
        </p>
      </div>
      <div className="p-6 space-y-4 w-1/2">
        <div className="space-y-2">
          <label
            htmlFor="organization-select"
            className="block text-sm font-medium text-gray-700"
          >
            Organizações Disponíveis
          </label>
          <Select onValueChange={handleSelectOrganization}>
            <SelectTrigger
              placeholder="Selecione uma organização"
              Icon={Building2}
            />
            <SelectContent>
              <div>
                <SelectItem value="teste123" label="labellll" />
                <SelectItem value="tes131te123" label="labellll2" />
                <SelectItem
                  value="tes31te113123"
                  label="testando label novov123"
                />
                <SelectItem value="teste121313" label="labellll4" />
              </div>
            </SelectContent>
          </Select>
        </div>

        {!selectedOrganization && <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="backdrop-blur-md px-2 text-gray-500">ou</span>
          </div>
        </div>}

        <div className="flex gap-4">
          {!selectedOrganization &&<Button
            onClick={toggleHandleCreateNew}
            variant="secondary"
            size="sm"
            className="flex-1"
          >
            <CirclePlus size={16} />
            <p>Criar Organização</p>
          </Button>}
          {selectedOrganization && <Button
            onClick={() => {}}
            size="sm"
            className="flex-1"
          >
            Continuar
          </Button>}
        </div>
      </div>
    </div>
  );
}

export default NotFoundOrgPage;
