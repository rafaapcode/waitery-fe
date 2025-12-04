import z from "zod";

export const editProductFormSchema = z.object({
  image: z.file("A imagem do produto é obrigatória").optional(),
  name: z.string().min(1, "O nome do produto é obrigatório"),
  description: z.string().min(1, "A descrição do produto é obrigatória"),
  price: z.string().min(1, "O preço do produto é obrigatório"),
  category: z.string().min(1, "A categoria do produto é obrigatória"),
  ingredients: z.string().min(1).array(),
});

export type EditProductFormData = z.infer<typeof editProductFormSchema>;