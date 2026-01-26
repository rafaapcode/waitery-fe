import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useOrgMutation } from "../../../../app/hooks/mutations/useOrgMutation";
import Button from "../../../../components/atoms/Button";
import Input from "../../../../components/atoms/Input";
import TextArea from "../../../../components/atoms/TextArea";
import ImageInput from "../../../../components/molecules/ImageInput";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../components/molecules/Modal";
import Select, {
  SelectContent,
  SelectTrigger,
} from "../../../../components/molecules/Select";
import {
  createOrgFormSchema,
  type CreateOrgFormData,
} from "../schemas/createOrgSchema";

interface CreateOrgModalProps {
  open: boolean;
  onClose: () => void;
}

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

function CreateOrgModal({ open, onClose }: CreateOrgModalProps) {
  const { createOrg, isPending } = useOrgMutation({ onClose });
  const form = useForm<CreateOrgFormData>({
    resolver: zodResolver(createOrgFormSchema),
    defaultValues: {
      close_hour: 0,
      open_hour: 18,
    },
  });

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    await createOrg(data);
  });

  return (
    <Modal open={open}>
      <ModalHeader
        title="Criar Organização"
        onClose={() => {
          onClose();
          reset();
        }}
      />

      <ModalContent>
        <div className="w-[800px] max-h-[600px]">
          <div className="w-full max-h-full mt-2 flex flex-col gap-2 items-center justify-center mx-auto overflow-y-auto">
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <ImageInput
                  label=""
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
              <TextArea
                placeholder="Descrição"
                {...register("description")}
                error={errors.description?.message}
              />
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
                <label className="text-gray-600 text-sm">
                  Horário de Abertura
                </label>
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
                      <SelectTrigger placeholder="Selecione um horario de fechamento" />
                      <SelectContent options={closeHours} className="p-1" />
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </ModalContent>

      <ModalFooter className="w-full flex justify-end items-center">
        <Button
          disabled={!isValid || !isDirty || isSubmitting || isPending}
          isLoading={isSubmitting || isPending}
          size="md"
          onClick={onSubmit}
        >
          Criar Organização
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateOrgModal;
