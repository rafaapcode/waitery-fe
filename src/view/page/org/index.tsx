import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useOrg } from "../../../app/hooks/queries/useOrg";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import TextArea from "../../../components/atoms/TextArea";
import ImageInput from "../../../components/molecules/ImageInput";
import Select, {
  SelectContent,
  SelectTrigger,
} from "../../../components/molecules/Select";
import { editOrgFormSchema, type EditOrgFormData } from "./schemas/editOrgSchema";

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
  const { org, isFetching} = useOrg({});

  const form = useForm<EditOrgFormData>({
    resolver: zodResolver(editOrgFormSchema),
    defaultValues: {
      cep: org?.cep || "",
      description: org?.description || "",
      email: org?.email || "",
      location_code: org?.location_code || undefined,
      name: org?.name || "",
      close_hour: org?.close_hour || 23,
      open_hour: org?.open_hour || 18,
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
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
              label=""
              onChange={field.onChange}
              url={field.value || org?.image_url}
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
            isLoading={isFetching}
          />
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            placeholderText="Email da Organização"
            error={errors.email?.message}
            isLoading={isFetching}
          />
        </div>

        <div className="w-full">
          <TextArea placeholder="Descrição" {...register("description")} error={errors.description?.message} />
        </div>

        <div className="w-full flex gap-4">
          <Input
            {...register("location_code")}
            type="number"
            placeholder="Número"
            placeholderText="1298"
            error={errors.location_code?.message}
            isLoading={isFetching}
          />
          <Input
            {...register("cep")}
            placeholder="CEP"
            placeholderText="CEP da Organização"
            error={errors.cep?.message}
            isLoading={isFetching}
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
                  isLoading={isFetching}
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
                  isLoading={isFetching}
                  value={String(field.value)}
                  onValueChange={(e) => {
                    field.onChange(Number(e));
                  }}
                >
                  <SelectTrigger placeholder="Selecione um horario de fechamento"/>
                  <SelectContent options={closeHours} className="p-1" />
                </Select>
              )}
            />
          </div>
        </div>

        <div className="w-full flex justify-end items-center">
          <Button
            disabled={!isDirty || isSubmitting || !isValid}
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
