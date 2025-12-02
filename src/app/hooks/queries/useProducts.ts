import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../../service/product/productService";

interface UseProductsProps {
  enabled?: boolean; 
}

export function useProducts({ enabled }: UseProductsProps) {
   const { data, isError, isFetching, isSuccess, refetch} = useQuery({
    enabled: enabled ?? true,
    queryKey: ["products", "all"],
    queryFn: async () => {
      const products = await ProductService.getAllProducts();
      return products;
    },
  });

  return { products: data, isError, isFetching, isSuccess, loadProducts: refetch };
}