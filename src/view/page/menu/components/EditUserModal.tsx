import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Category } from "../../../../app/entities/Category";
import Button from "../../../../components/atoms/Button";
import Input from "../../../../components/atoms/Input";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../components/molecules/Modal";
import { editCategoryFormSchema, type EditCategoryFormData } from "../schemas/editCategorySchema";

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  category: Category;
}

function EditCategoryModal({ open, onClose, category }: EditCategoryModalProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<EditCategoryFormData>({
    resolver: zodResolver(editCategoryFormSchema),
    mode: "onChange",
    defaultValues: {
      name: category.name,
      icon: category.icon,
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onClose();
  });

  return (
    <Modal open={open}>
      <ModalHeader title="Editar Categoria" onClose={() => {
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

      <ModalFooter className="w-full flex justify-between items-center">
        <Button size="md" variant="secondary">
          Excluir Categoria
        </Button>
        <Button
          disabled={!isValid || !isDirty || isSubmitting}
          isLoading={isSubmitting}
          size="md"
          onClick={onSubmit}
        >
          Salvar Alterações
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditCategoryModal;
