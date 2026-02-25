import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CategoryService } from "../../service/category/categoryService";
import { useRevalidateCategory } from "../revalidates/useRevalidateCategory";

interface UseDeleteCategoryMutationProps {
  onClose: () => void;
}

export function useDeleteCategoryMutation({
  onClose,
}: UseDeleteCategoryMutationProps) {
  const { revalidateCategories } = useRevalidateCategory();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (categoryId: string) =>
      CategoryService.deleteCategory(categoryId),
    onSuccess: () => {
      revalidateCategories();
      onClose();
      toast.success("Categoria excluída com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao excluir categoria");
    },
  });

  return { deleteCategory: mutateAsync, isPending };
}
