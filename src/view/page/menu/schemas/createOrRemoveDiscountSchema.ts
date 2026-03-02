import z from "zod";

export const createOrRemoveDiscountFormSchema = z.object({
  discountedPrice: z
    .string()
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0, {
      message: "O preço de desconto deve ser positivo",
    }),
});

export type CreateOrRemoveDiscountFormData = z.infer<
  typeof createOrRemoveDiscountFormSchema
>;
