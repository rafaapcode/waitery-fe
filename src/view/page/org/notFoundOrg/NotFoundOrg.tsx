import { Building2 } from "lucide-react";
import Select, { SelectContent, SelectItem, SelectTrigger } from "../../../../components/molecules/Select";

function NotFoundOrgPage() {
  return (
    <div className="w-full h-full">
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
      <Select  onValueChange={(e) => console.log(e)}>
        <SelectTrigger 
          placeholder="Selecione uma organização"
          Icon={Building2}
        />
        <SelectContent>
          <div>
            <SelectItem value="teste123" label="labellll"/>
            <SelectItem value="tes131te123" label="labellll2"/>
            <SelectItem value="tes31te113123" label="testando label novov123"/>
            <SelectItem value="teste121313" label="labellll4"/>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}

export default NotFoundOrgPage;
