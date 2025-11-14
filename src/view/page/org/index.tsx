import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import TextArea from "../../../components/atoms/TextArea";
import ImageInput from "../../../components/molecules/ImageInput";
import Select, {
  SelectContent,
  SelectTrigger,
} from "../../../components/molecules/Select";
import {
  createOrgFormSchema,
  type CreateOrgFormData,
} from "./schemas/CreateOrgSchema";

const openHours = [
  { label: "10:00", value: "10" },
  { label: "11:00", value: "11" },
  { label: "12:00", value: "12" },
  { label: "13:00", value: "13" },
  { label: "14:00", value: "14" },
  { label: "15:00", value: "15" },
  { label: "16:00", value: "16" },
  { label: "17:00", value: "17" },
  { label: "18:00", value: "18" },
];

const closeHours = [
  { label: "19:00", value: "19" },
  { label: "20:00", value: "20" },
  { label: "21:00", value: "21" },
  { label: "22:00", value: "22" },
  { label: "23:00", value: "23" },
  { label: "00:00", value: "0" },
];

function Org() {
  const form = useForm<CreateOrgFormData>({
    resolver: zodResolver(createOrgFormSchema),
    defaultValues: {},
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-1/2 max-h-full mt-2 flex flex-col gap-2 items-center justify-center mx-auto overflow-y-auto">
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <ImageInput
              onChange={field.onChange}
              url={field.value}
              className="h-40"
            />
          )}
        />

        <div className="w-full flex gap-4">
          <Input
            {...register("name")}
            placeholder="Nome"
            placeholderText="Nome da Organização"
            error={errors.name?.message}
          />
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            placeholderText="Email da Organização"
            error={errors.email?.message}
          />
        </div>

        <div className="w-full">
          <TextArea placeholder="Descrição" {...register("description")} />
        </div>

        <div className="w-full flex gap-4">
          <Input
            {...register("location_code")}
            type="number"
            placeholder="Número"
            placeholderText="1298"
            error={errors.location_code?.message}
          />
          <Input
            {...register("cep")}
            placeholder="CEP"
            placeholderText="CEP da Organização"
            error={errors.cep?.message}
          />
        </div>
        <div className="w-full flex gap-4">
          <div className="flex-1">
            <label className="text-gray-600 text-sm">Horário de Abertura</label>
            <Controller
              control={control}
              name="open_hour"
              render={({ field }) => (
                <Select
                  value={String(field.value)}
                  onValueChange={(e) => {
                    field.onChange(Number(e));
                  }}
                >
                  <SelectTrigger placeholder="Selecionar horário de abertura" />
                  <SelectContent options={openHours} className="p-1" />
                </Select>
              )}
            />
          </div>
          <div className="flex-1">
            <label className="text-gray-600 text-sm">
              Horário de Fechamento
            </label>
            <Controller
              control={control}
              name="close_hour"
              render={({ field }) => (
                <Select
                  value={String(field.value)}
                  onValueChange={(e) => {
                    field.onChange(Number(e));
                  }}
                >
                  <SelectTrigger placeholder="Selecionar horário de fechamento" />
                  <SelectContent options={closeHours} className="p-1" />
                </Select>
              )}
            />
          </div>
        </div>

        <div className="w-full flex justify-end items-center">
          <Button
            disabled={!isDirty || isSubmitting}
            isLoading={isSubmitting}
            size="sm"
            onClick={onSubmit}
          >
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Org;
