import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateIngredientMutation } from "../../../../../app/hooks/mutations/useIngredientMutation";
import Button from "../../../../../components/atoms/Button";
import Input from "../../../../../components/atoms/Input";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../../components/molecules/Modal";
import { createIngredientFormSchema, type CreateIngredientFormData } from "../../schemas/createIngredientSchema";

interface CreateIngredientModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateIngredientModal({ open, onClose }: CreateIngredientModalProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<CreateIngredientFormData>({
    resolver: zodResolver(createIngredientFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const {createIngredient, isPending} = useCreateIngredientMutation({ onClose });

  const onSubmit = handleSubmit((data) => {
    createIngredient(data);
  });

  return (
    <Modal open={open}  priority="medium">
      <ModalHeader title="Novo Ingrediente" onClose={() => {
        onClose();
        reset();
      }} />

      <ModalContent>
        <div className="w-[416px] space-y-6">
          <Input
            type="text"
            placeholder="Emoji"
            size={1}
            {...register("icon")}
            error={errors.icon?.message}
          />
          <Input
            type="text"
            placeholder="Nome do ingrediente"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
      </ModalContent>

      <ModalFooter className="w-full flex justify-end items-center">
        <Button
          disabled={!isValid || !isDirty || isSubmitting || isPending}
          isLoading={isSubmitting || isPending}
          size="md"
          onClick={onSubmit}
        >
          Criar ingrediente
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateIngredientModal;
