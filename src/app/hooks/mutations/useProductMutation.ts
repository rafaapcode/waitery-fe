import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ProductService } from "../../service/product/productService";
import { useRevalidateProducts } from "../revalidates/useRevalidateProducts";

interface UseDeleteProductMutationProps {
  id: string;
  onClose: () => void;
}

export function useDeleteProductMutation({
  id,
  onClose,
}: UseDeleteProductMutationProps) {
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
  });

  return { deleteProduct: mutateAsync, isPending };
}

interface UseCreateProductMutationProps {
  onClose: () => void;
}

export function useCreateProductMutation({
  onClose,
}: UseCreateProductMutationProps) {
  const { revalidateProducts } = useRevalidateProducts();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ProductService.CreateProductsInput) =>
      ProductService.createProduct(data),
    onSuccess: () => {
      revalidateProducts();
      onClose();
      toast.success("Produto criado com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao criar produto");
    },
  });

  return { createProduct: mutateAsync, isPending };
}

interface UseUpdateProductMutationProps {
  id: string;
  onClose: () => void;
}

export function useUpdateProductMutation({
  id,
  onClose,
}: UseUpdateProductMutationProps) {
  const { revalidateProducts } = useRevalidateProducts();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      data,
      dirtiesFieds,
    }: {
      data: ProductService.UpdateProductsInput["data"];
      dirtiesFieds: ProductService.UpdateProductsInput["dirtiesFieds"];
    }) => ProductService.updateProduct({ id, data, dirtiesFieds }),
    onSuccess: () => {
      revalidateProducts();
      onClose();
      toast.success("Produto atualizado com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao atualizar produto");
    },
  });

  return { updateProduct: mutateAsync, isPending };
}

interface UseAddDiscountMutationProps {
  onClose: () => void;
}

export function useAddDiscountMutation({
  onClose,
}: UseAddDiscountMutationProps) {
  const { revalidateProducts } = useRevalidateProducts();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ProductService.AddDiscountInput) =>
      ProductService.addDiscountToProduct(data),
    onSuccess: () => {
      revalidateProducts();
      onClose();
      toast.success("Desconto adicionado com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao adicionar desconto");
    },
  });

  return { addDiscount: mutateAsync, isPending };
}
