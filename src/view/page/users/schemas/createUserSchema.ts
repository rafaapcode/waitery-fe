import z from "zod";

export const createUserForm = z.object({
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
  email: z.email("E-mail inválido"),
  cpf: z.string('Cpf é obrigatório').min(11, "O CPF deve ter no mínimo 11 caracteres"),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
  role: z.enum(["ADMIN", "WAITER"])
});

export type CreateUserFormData = z.infer<typeof createUserForm>;