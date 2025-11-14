import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import TextArea from "../../../components/atoms/TextArea";
import ImageInput from "../../../components/molecules/ImageInput";
import Select, {
  SelectContent,
  SelectTrigger,
} from "../../../components/molecules/Select";

const openHours = [
  { label: "10:00", value: "10" },
  { label: "11:00", value: "11" },
  { label: "12:00", value: "12" },
  { label: "13:00", value: "13" },
  { label: "14:00", value: "14" },
  { label: "15:00", value: "15" },
  { label: "16:00", value: "16" },
  { label: "17:00", value: "17" },
  { label: "18:00", value: "18" }
];

const closeHours = [
  { label: "19:00", value: "19" },
  { label: "20:00", value: "20" },
  { label: "21:00", value: "21" },
  { label: "22:00", value: "22" },
  { label: "23:00", value: "23" },
  { label: "00:00", value: "0" }
]

function Org() {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-1/2 max-h-full mt-2 flex flex-col gap-2 items-center justify-center mx-auto overflow-y-auto">
        <ImageInput label="" className="h-40" />
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
          <TextArea placeholder="Descrição" />
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
            <label className="text-gray-600 text-sm">
              Horário de Abertura
            </label>
            <Select
              onValueChange={(e) => {
                // field.onChange(e);
              }}
            >
              <SelectTrigger placeholder="Selecionar horário de abertura" />
              <SelectContent options={openHours} className="p-1" />
            </Select>
          </div>
           <div className="flex-1">
            <label className="text-gray-600 text-sm">
              Horário de Fechamento
            </label>
            <Select
              onValueChange={(e) => {
                // field.onChange(e);
              }}
            >
              <SelectTrigger placeholder="Selecionar horário de fechamento" />
              <SelectContent options={closeHours} className="p-1" />
            </Select>
          </div>
        </div>

        <div className="w-full flex justify-end items-center">
          <Button size="sm">Salvar Alterações</Button>
        </div>
      </div>
    </div>
  );
}

export default Org;
