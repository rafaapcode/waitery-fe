import z from "zod";

export const editCategoryFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  icon: z.emoji("O ícone deve ser um emoji válido").min(1, "O ícone é obrigatório"),
});

export type EditCategoryFormData = z.infer<typeof editCategoryFormSchema>;