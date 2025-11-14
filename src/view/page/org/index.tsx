import { Building2Icon } from "lucide-react";
import Input from "../../../components/atoms/Input";
import TextArea from "../../../components/atoms/TextArea";
import ImageInput from "../../../components/molecules/ImageInput";
import PageHeader from "../../../components/molecules/PageHeader";
import Select, {
  SelectContent,
  SelectTrigger,
} from "../../../components/molecules/Select";

function Org() {
  return (
    <div className="w-full h-full">
      <PageHeader
        icon={Building2Icon}
        title="Organização"
        subtitle="Gerencie as informações da sua organização"
      />
      <div className="w-1/2 mt-4 flex flex-col gap-4 items-center justify-center mx-auto p-6">
        <ImageInput label="" className="h-60" />
        <div className="w-full flex gap-4">
          <Input
            placeholder="Nome"
            name="nome"
            placeholderText="Nome da Organização"
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            placeholderText="Email da Organização"
          />
        </div>

        <div className="w-full">
          <TextArea placeholder="Descrição" rows={4} />
        </div>

        <div className="w-full flex gap-4">
          <Input
            type="number"
            placeholder="Número"
            name="numero"
            placeholderText="1298"
          />
          <Input
            placeholder="CEP"
            name="cep"
            placeholderText="CEP da Organização"
          />
        </div>
        <div className="w-full flex gap-4">
          <div className="flex-1">
            <Select
              onValueChange={(e) => {
                // field.onChange(e);
              }}
            >
              <SelectTrigger placeholder="Selecionar horário de abertura" />
              <SelectContent options={[]} className="p-1" />
            </Select>
          </div>
           <div className="flex-1">
            <Select
              onValueChange={(e) => {
                // field.onChange(e);
              }}
            >
              <SelectTrigger placeholder="Selecionar horário de abertura" />
              <SelectContent options={[]} className="p-1" />
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Org;
