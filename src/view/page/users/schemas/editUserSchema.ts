import z from "zod";

export const editUserFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().optional(),
  role: z.enum(["WAITER", "ADMIN"]).optional(),
});

export type EditUserFormData = z.infer<typeof editUserFormSchema>;