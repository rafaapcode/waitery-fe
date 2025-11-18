import z from "zod";

export const createOrgFormSchema = z.object({
  image: z.file().optional(),
  name: z.string().min(1, "O nome da organização é obrigatório"),
  email: z.email("O email da organização é obrigatório"),
  description: z.string().min(1, "A descrição da organização é obrigatória"),
  location_code: z.string("O número do estabelecimento é obrigatório").min(1, "O número do estabelecimento deve ser válido"),
  cep: z.string("O número do CEP é obrigatório").min(8, "O número do CEP deve ser válido"),
  open_hour: z.number("O horário de abertura é obrigatório").min(10, "O horário de abertura deve ser válido").max(18, "O horário de abertura deve ser válido"),
  close_hour: z.number("O horário de fechamento é obrigatório").min(0, "O horário de fechamento deve ser válido").max(23, "O horário de fechamento deve ser válido"),
});

export type CreateOrgFormData = z.infer<typeof createOrgFormSchema>;