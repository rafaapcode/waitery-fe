import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Product } from "../../../../../app/entities/Product";
import { useAddDiscountMutation } from "../../../../../app/hooks/mutations/useProductMutation";
import Button from "../../../../../components/atoms/Button";
import Input from "../../../../../components/atoms/Input";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../../components/molecules/Modal";
import {
  createOrRemoveDiscountFormSchema,
  type CreateOrRemoveDiscountFormData,
} from "../../schemas/createOrRemoveDiscountSchema";

interface CreateDiscountModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

function CreateDiscountModal({
  open,
  onClose,
  product,
}: CreateDiscountModalProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<CreateOrRemoveDiscountFormData>({
    resolver: zodResolver(createOrRemoveDiscountFormSchema),
    mode: "onChange",
    defaultValues: {
      discountedPrice: product.discount ? product.discounted_price : 0,
    },
  });

  const { addDiscount, isPending } = useAddDiscountMutation({ onClose });

  const onSubmit = handleSubmit((data) => {
    addDiscount({ id: product.id, discounted_price: data.discountedPrice });
  });

  return (
    <Modal open={open} priority="medium">
      <ModalHeader
        title={product.discount ? "Atualizar Desconto" : "Adicionar Desconto"}
        onClose={() => {
          onClose();
          reset();
        }}
      />

      <ModalContent>
        <div className="w-[416px] space-y-6">
          <Input
            type="number"
            placeholder="Preço com desconto"
            max={product.price}
            min={1}
            {...register("discountedPrice")}
            error={errors.discountedPrice?.message}
          />
        </div>
      </ModalContent>

      <ModalFooter className="w-full flex justify-end items-center">
        {product.discount && (
          <Button
            // disabled={!isValid || !isDirty || isSubmitting || isPending}
            // isLoading={isSubmitting || isPending}
            size="md"
            onClick={onSubmit}
          >
            Remover Desconto
          </Button>
        )}
        <Button
          disabled={!isValid || !isDirty || isSubmitting || isPending}
          isLoading={isSubmitting || isPending}
          size="md"
          onClick={onSubmit}
        >
          {product.discount ? "Atualizar Desconto" : "Adicionar Desconto"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateDiscountModal;
