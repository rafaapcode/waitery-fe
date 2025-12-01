import { useMutation } from "@tanstack/react-query";
import { PencilIcon, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Category } from "../../../../../app/entities/Category";
import { CategoryService } from "../../../../../app/service/category/categoryService";
import Button from "../../../../../components/atoms/Button";
import ConfirmModal from "../../../../../components/molecules/ConfirmModal";
import EditCategoryModal from "./EditCategoryModal";

interface CategoryActionComponentProps {
  category: Category;
}

function CategoryActionComponent({ category }: CategoryActionComponentProps) {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);

  const onCloseEditModal = () => setIsOpenEditModal(false);
  const onCloseConfirmModal = () => setIsOpenConfirmModal(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => CategoryService.deleteCategory(category.id),
    onSuccess: () => {
      onCloseConfirmModal();
      toast.success("Categoria excluída com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao excluir categoria");
    }
  })


  return (
    <div className="flex gap-1.5 items-center justify-end">
      <EditCategoryModal 
        open={isOpenEditModal}
        onClose={onCloseEditModal}
        category={category}
      />
      <ConfirmModal 
        open={isOpenConfirmModal}
        title="Excluir categoria"
        description={`Tem certeza que deseja excluir a categoria ? ${category.icon} ${category.name}. `}
        onConfirm={mutateAsync}
        onCancel={onCloseConfirmModal}
        isLoading={isPending}
      />
      <Button
        onClick={() => setIsOpenEditModal(true)}
        size="icon"
        variant="secondary"
        className="text-gray-500 hover:text-gray-400"
      >
        <PencilIcon size={18} />
      </Button>
      <Button
        onClick={() => setIsOpenConfirmModal(true)}
        size="icon"
        variant="secondary"
        className="text-red-700 hover:text-red-600"
      >
        <Trash size={18} />
      </Button>
    </div>
  );
}

export default CategoryActionComponent;
