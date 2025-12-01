import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
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

  const { loadCategories } = useCategories({});

  const createCategoryMutation = useMutation({
    mutationFn: (data: CategoryService.CreateCategoryInput) => CategoryService.createCategory(data),
    onSuccess: () => {
      loadCategories();
      reset();
      onClose();
      toast.success("Categoria criada com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao criar categoria");
    }
  })

  const onSubmit = handleSubmit((data) => {
    createCategoryMutation.mutate(data);
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
