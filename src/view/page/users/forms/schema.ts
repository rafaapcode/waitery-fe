import z from "zod";

export const editUserFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().optional(),
  role: z.enum(["ADMIN", "WAITER"])
});

export type EditUserFormData = z.infer<typeof editUserFormSchema>;

export const createUserForm = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  email: z.email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
  role: z.enum(["ADMIN", "WAITER"])
});

export type CreateUserFormData = z.infer<typeof createUserForm>;