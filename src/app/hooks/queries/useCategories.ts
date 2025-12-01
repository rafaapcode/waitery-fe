import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "../../service/category/categoryService";

interface UseCategoriesProps {
  enabled?: boolean; 
}

export function useCategories({ enabled }: UseCategoriesProps) {
   const { data, isError, isFetching, isSuccess, refetch} = useQuery({
    enabled: enabled ?? true,
    queryKey: ["categories", "all"],
    queryFn: async () => {
      const categories = await CategoryService.getAllCategories();
      return categories;
    },
  });

  return { categories: data, isError, isFetching, isSuccess, loadCategories: refetch };
}