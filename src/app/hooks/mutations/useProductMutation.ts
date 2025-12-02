import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ProductService } from "../../service/product/productService";
import { useRevalidateProducts } from "../revalidates/useRevalidateProducts";

interface UseDeleteProductMutationProps {
  id: string;
  onClose: () => void;
}

export function useDeleteProductMutation({ id, onClose }: UseDeleteProductMutationProps) {
  const { revalidateProducts } = useRevalidateProducts();
  
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => ProductService.deleteProduct(id),
    onSuccess: () => {
      revalidateProducts();
      onClose();
      toast.success("Produto excluído com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao excluir produto");
    },
  })

  return { deleteProduct: mutateAsync, isPending };
}


export function useCreateProductMutation({ id, onClose }: UseDeleteProductMutationProps) {
  const { revalidateProducts } = useRevalidateProducts();
  
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => ProductService.deleteProduct(id),
    onSuccess: () => {
      revalidateProducts();
      onClose();
      toast.success("Produto excluído com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao excluir produto");
    },
  })

  return { deleteProduct: mutateAsync, isPending };
}