import z from "zod";

export const editOrgFormSchema = z.object({
  image: z.file("A imagem da organização é obrigatória").optional(),
  name: z.string().min(1, "O nome da organização é obrigatório").optional(),
  email: z.email("O email da organização é obrigatório").optional(),
  description: z.string().min(1, "A descrição da organização é obrigatória").optional(),
  location_code: z.string("O número do estabelecimento é obrigatório").min(0, "O número do estabelecimento deve ser válido").optional(),
  cep: z.string("O número do CEP é obrigatório").min(0, "O número do CEP deve ser válido").optional(),
  open_hour: z.number("O horário de abertura é obrigatório").min(10, "O horário de abertura deve ser válido").max(18, "O horário de abertura deve ser válido").optional(),
  close_hour: z.number("O horário de fechamento é obrigatório").min(0, "O horário de fechamento deve ser válido").max(23, "O horário de fechamento deve ser válido").optional(),
});

export type EditOrgFormData = z.infer<typeof editOrgFormSchema>;