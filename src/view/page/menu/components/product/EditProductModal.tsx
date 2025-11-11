import { useState } from "react";
import type { Product } from "../../../../../app/entities/Product";
import Button from "../../../../../components/atoms/Button";
import Input from "../../../../../components/atoms/Input";
import DropDownMenu, {
  type OptionsType,
} from "../../../../../components/molecules/DropdownMenu";
import ImageInput from "../../../../../components/molecules/ImageInput";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../../components/molecules/Modal";
import IngredientsList from "./IngredientsList";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

function EditProductModal({ open, onClose, product }: EditProductModalProps) {
  const [category, setCategory] = useState<string>("");
  // const {
  //   handleSubmit,
  //   register,
  //   reset,
  //   formState: { errors, isSubmitting, isValid, isDirty },
  // } = useForm<EditCategoryFormData>({
  //   resolver: zodResolver(editCategoryFormSchema),
  //   mode: "onChange",
  //   defaultValues: {
  //     name: category.name,
  //     icon: category.icon,
  //   },
  // });

  // const onSubmit = handleSubmit((data) => {
  //   console.log(data);
  //   onClose();
  // });
  const categoriesOptions: OptionsType[] = [
    {
      icon: "🍔",
      label: "Comidas",
      value: "comida_id",
      type: "option",
    },
    {
      icon: "🍔",
      label: "Comidas",
      value: "comida_id",
      type: "option",
    },
    {
      icon: "🍔",
      label: "Comidas",
      value: "comida_id",
      type: "option",
    },
    {
      icon: "🍔",
      label: "Comidas",
      value: "comida_id",
      type: "option",
    },
  ];

  return (
    <Modal open={open}>
      <ModalHeader
        title="Editar Produto"
        onClose={() => {
          onClose();
          // reset();
        }}
      />

      <ModalContent>
        <div className="w-[800px] max-h-[600px] grid grid-cols-2 gap-2">
          {/* Primeira Coluna */}
          <div className="flex flex-col w-full h-full gap-2">
            <ImageInput url={product.image_url} />

            <Input
              name="product-name"
              type="text"
              placeholder="Nome do Produto"
              // {...register("name")}
              // error={errors.name?.message}
            />

            <Input
              name="description"
              type="text"
              placeholder="Descrição do Produto"
              max={110}
              // {...register("description")}
              // error={errors.description?.message}
            />

            <div className="flex flex-col gap-2">
              <span  className="text-gray-600 text-sm">Categoria</span>
              <DropDownMenu
                options={categoriesOptions}
                onSelect={(e) => setCategory(e?.label || "")}
              >
                <span className="w-full border border-red-500 px-2 py-3 text-sm rounded-md hover:bg-red-50 cursor-pointer transition-colors duration-200">
                  {!category ? "Selecionar Categoria" : category}
                </span>
              </DropDownMenu>
            </div>
          </div>


          {/* Segunda Coluna */}
          <div className="w-full max-h-[300px]">
            <IngredientsList />
          </div>
        </div>
      </ModalContent>

      <ModalFooter className="w-full flex justify-between items-center">
        <Button size="md" variant="secondary">
          Excluir Produto
        </Button>
        {/* <Button
          disabled={!isValid || !isDirty || isSubmitting}
          isLoading={isSubmitting}
          size="md"
          onClick={onSubmit}
        >
          Salvar Alterações
        </Button> */}
      </ModalFooter>
    </Modal>
  );
}

export default EditProductModal;
