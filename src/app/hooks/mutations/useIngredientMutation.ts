import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IngredientService } from "../../service/ingredient/ingredientService";
import { useRevalidateIngredients } from "../revalidates/useRevalidateIngredients";

interface UseCreateIngredientMutationProps {
  onClose: () => void;
}

export function useCreateIngredientMutation({ onClose }: UseCreateIngredientMutationProps) {
  const { revalidateIngredients } = useRevalidateIngredients();
  
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: IngredientService.CreateIngredientInput) => IngredientService.createIngredients(data),
    onSuccess: () => {
      revalidateIngredients();
      onClose();
      toast.success("Ingrediente criado com sucesso");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao criar ingrediente");
    },
  })

  return { createIngredient: mutateAsync, isPending };
}