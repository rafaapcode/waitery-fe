import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../../../components/atoms/Button";
import Input from "../../../../../components/atoms/Input";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../../components/molecules/Modal";
import { editCategoryFormSchema, type EditCategoryFormData } from "../../schemas/editCategorySchema";

interface CreateCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateCategoryModal({ open, onClose }: CreateCategoryModalProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<EditCategoryFormData>({
    resolver: zodResolver(editCategoryFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      icon: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onClose();
  });

  return (
    <Modal open={open}>
      <ModalHeader title="Nova Categoria" onClose={() => {
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
            placeholder="Nome da Categoria"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
      </ModalContent>

      <ModalFooter className="w-full flex justify-end items-center">
        <Button
          disabled={!isValid || !isDirty || isSubmitting}
          isLoading={isSubmitting}
          size="md"
          onClick={onSubmit}
        >
          Salvar Categoria
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateCategoryModal;
