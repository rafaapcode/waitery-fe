import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { Category } from "../../../../../app/entities/Category";
import { useCategories } from "../../../../../app/hooks/queries/useCategories";
import { CategoryService } from "../../../../../app/service/category/categoryService";
import Button from "../../../../../components/atoms/Button";
import Input from "../../../../../components/atoms/Input";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../../components/molecules/Modal";
import { editCategoryFormSchema, type EditCategoryFormData } from "../../schemas/editCategorySchema";

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
  const { loadCategories } = useCategories({});

  const deleteCategoryMutation = useMutation({
    mutationFn: () => CategoryService.deleteCategory(category.id),
    onSuccess: () => {
      loadCategories();
      onClose()
      toast.success("Categoria excluída com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao excluir categoria");
    }
  })

  const editCategoryMutation = useMutation({
    mutationFn: (data: CategoryService.EditCategoryInput) => CategoryService.editCategory(category.id, data),
    onSuccess: () => {
      loadCategories();
      onClose();
      toast.success("Categoria editada com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao editar categoria");
    }
  })

  const onSubmit = handleSubmit((data) => {
    editCategoryMutation.mutate(data);
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
        <Button size="md" variant="secondary" onClick={() => deleteCategoryMutation.mutateAsync()} isLoading={deleteCategoryMutation.isPending}>
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
