import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { categoryToOptionsType } from "../../../../../app/entities/Category";
import { useCreateProductMutation } from "../../../../../app/hooks/mutations/useProductMutation";
import { useCategories } from "../../../../../app/hooks/queries/useCategories";
import Button from "../../../../../components/atoms/Button";
import Input from "../../../../../components/atoms/Input";
import DropDownMenu from "../../../../../components/molecules/DropdownMenu";
import ImageInput from "../../../../../components/molecules/ImageInput";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../../components/molecules/Modal";
import {
  createProductFormSchema,
  type CreateProductFormData,
} from "../../schemas/createProductSchema";
import IngredientsList from "./IngredientsList";

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateProductModal({ open, onClose }: CreateProductModalProps) {
  const [category, setCategory] = useState<string>("");
  const { categories, isFetching } = useCategories({});

  const form = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductFormSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = form;

  const { createProduct, isPending } = useCreateProductMutation({ onClose });

  const onSubmit = handleSubmit((data) => {
    if (data.ingredients.length === 0) {
      toast.error("Adicione ao menos um ingrediente ao produto.");
      return;
    }
    createProduct({
      image: data.image,
      category_id: data.category,
      description: data.description,
      ingredients: data.ingredients,
      name: data.name,
      price: data.price,
    });
  });

  return (
    <Modal open={open} nativeHidden={false}>
      <ModalHeader
        title="Novo Produto"
        onClose={() => {
          onClose();
          reset();
        }}
      />

      <ModalContent>
        {isFetching && (
          <div>
            <LoaderCircleIcon className="text-red-700 animate-spin" size={28} />
          </div>
        )}
        {!isFetching && (
          <div className="w-[800px] max-h-[600px] grid grid-cols-2 gap-2">
            {/* Primeira Coluna */}
            <div className="flex flex-col w-full h-full gap-2">
              <Controller
                control={control}
                name="image"
                render={({ field }) => (
                  <ImageInput onChange={field.onChange} url={field.value} />
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

              <div className="flex flex-col gap-2">
                <span className="text-gray-600 text-sm">Categoria</span>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <DropDownMenu
                      options={categoryToOptionsType(categories || [])}
                      onSelect={(e) => {
                        setCategory(e?.label || "");
                        field.onChange(e?.value);
                      }}
                    >
                      <span className="w-full border border-red-500 px-2 py-3 text-sm rounded-md hover:bg-red-50 cursor-pointer transition-colors duration-200">
                        {!category ? "Selecionar Categoria" : category}
                      </span>
                    </DropDownMenu>
                  )}
                />
              </div>
            </div>

            {/* Segunda Coluna */}
            <FormProvider {...form}>
              <div className="w-full max-h-[350px]">
                <IngredientsList />
              </div>
            </FormProvider>
          </div>
        )}
      </ModalContent>

      <ModalFooter className="w-full flex justify-end items-center">
        <Button
          disabled={!isValid || !isDirty || isSubmitting || isPending}
          isLoading={isSubmitting || isPending}
          size="md"
          onClick={onSubmit}
        >
          Salvar Produto
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateProductModal;
