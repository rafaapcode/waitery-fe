import z from "zod";

export const createOrRemoveDiscountFormSchema = z.object({
  discountedPrice: z
    .number()
    .positive("O preço de desconto deve ser positivo deve ser positivo"),
});

export type CreateOrRemoveDiscountFormData = z.infer<
  typeof createOrRemoveDiscountFormSchema
>;
