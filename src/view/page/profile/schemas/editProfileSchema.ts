import z from "zod";

export const editProfileFormSchema = z.object({
  image: z.file().optional(),
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres").optional(),
  email: z.email("E-mail inválido").optional(),
  password: z.string().optional(),
  cpf: z.string().min(11, "O CPF deve ter no mínimo 11 caracteres").optional(),
});

export type EditProfileFormData = z.infer<typeof editProfileFormSchema>;