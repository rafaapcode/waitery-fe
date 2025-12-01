import z from "zod";

export const editProfileFormSchema = z
  .object({
    image: z.file().optional(),
    name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres").optional(),
    email: z.email("E-mail inválido").optional(),
    password: z.string().optional(),
    new_password: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.new_password && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "você deve informar a senha atual para alterar a senha",
      path: ["new_password"],
    }
  );

export type EditProfileFormData = z.infer<typeof editProfileFormSchema>;