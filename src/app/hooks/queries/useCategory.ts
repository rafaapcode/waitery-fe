import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "../../service/category/categoryService";

interface UseCategoryProps {
  categoryId: string;
  enabled?: boolean; 
}

export function useCategory({ categoryId, enabled }: UseCategoryProps) {
   const { data, isError, isFetching, isSuccess, refetch} = useQuery({
    enabled: enabled ?? true,
    queryKey: ["categories", categoryId],
    queryFn: async () => {
      const category = await CategoryService.getCategory(categoryId);
      return category;
    },
  });

  return { category: data, isError, isFetching, isSuccess, loadCategory: refetch };
}