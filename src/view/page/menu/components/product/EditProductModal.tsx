import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import type { Product } from "../../../../../app/entities/Product";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../../../../app/hooks/mutations/useProductMutation";
import { formatCurrency } from "../../../../../app/lib/formatCurrency";
import Button from "../../../../../components/atoms/Button";
import { Image } from "../../../../../components/atoms/Image";
import Input from "../../../../../components/atoms/Input";
import ConfirmModal from "../../../../../components/molecules/ConfirmModal";
import ImageInput from "../../../../../components/molecules/ImageInput";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../../components/molecules/Modal";
import {
  editProductFormSchema,
  type EditProductFormData,
} from "../../schemas/editProductSchema";
import IngredientsList from "./IngredientsList";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

function EditProductModal({ open, onClose, product }: EditProductModalProps) {
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const form = useForm<EditProductFormData>({
    resolver: zodResolver(editProductFormSchema),
    mode: "onChange",
    defaultValues: {
      category: product.category.name,
      description: product.description,
      name: product.name,
      price: product.price.toString(),
      ingredients: product.ingredients.map((ingredient) => ingredient.value),
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting, isValid, isDirty, dirtyFields },
  } = form;

  const updateProductMutation = useUpdateProductMutation({
    id: product.id,
    onClose,
  });

  const deleteProductMutation = useDeleteProductMutation({
    id: product.id,
    onClose,
  });

  const toggleDeleteProductModal = () => setDeleteProductModal((prev) => !prev);

  const onSubmit = handleSubmit((data) => {
    updateProductMutation.updateProduct({ data, dirtiesFieds: dirtyFields });
  });

  return (
    <Modal open={open} nativeHidden={false}>
      <ConfirmModal
        open={deleteProductModal}
        title="Excluir produto"
        onConfirm={() => deleteProductMutation.deleteProduct()}
        onCancel={toggleDeleteProductModal}
        isLoading={deleteProductMutation.isPending}
      >
        <div className="w-full">
          <p>Tem certeza que deseja excluir o produto ?</p>
          <div className="mt-6 flex border border-gray-300 rounded-md">
            <Image
              src={product.image_url}
              alt={product.name}
              className="rounded-tr-none rounded-br-none"
            />
            <div className="flex-1 py-2 px-4 flex flex-col justify-between">
              <p>
                {product.category.icon} {product.category.name}
              </p>
              <h4 className="font-semibold text-lg">{product.name}</h4>
              <p className="text-gray-600">{formatCurrency(product.price)}</p>
            </div>
          </div>
        </div>
      </ConfirmModal>

      <ModalHeader
        title="Editar Produto"
        onClose={() => {
          onClose();
          reset();
        }}
      />

      <ModalContent>
        <div className="w-[800px] max-h-[600px] grid grid-cols-2 gap-2">
          {/* Primeira Coluna */}
          <div className="flex flex-col w-full h-full gap-2">
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <ImageInput
                  onChange={field.onChange}
                  url={field.value || product.image_url}
                />
              )}
            />

            <Input
              type="text"
              placeholder="Nome do Produto"
              {...register("name")}
              error={errors.name?.message}
            />

            <Input
              type="text"
              placeholder="Descrição do Produto"
              max={110}
              {...register("description")}
              error={errors.description?.message}
            />

            <Input
              type="number"
              placeholder="Preço do Produto"
              {...register("price")}
              error={errors.price?.message}
            />
          </div>

          {/* Segunda Coluna */}
          <FormProvider {...form}>
            <div className="w-full max-h-[350px]">
              <IngredientsList
                ingredientsSelected={product.ingredients.map(
                  (ingredient) => ingredient.value
                )}
              />
            </div>
          </FormProvider>
        </div>
      </ModalContent>

      <ModalFooter className="w-full flex justify-between items-center">
        <Button
          size="md"
          variant="secondary"
          onClick={toggleDeleteProductModal}
        >
          Excluir Produto
        </Button>
        <Button
          disabled={!isValid || !isDirty || isSubmitting}
          isLoading={isSubmitting}
          size="md"
          onClick={onSubmit}
        >
          Salvar Alterações
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditProductModal;
