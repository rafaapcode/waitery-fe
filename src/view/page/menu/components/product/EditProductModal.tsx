import type { Product } from "../../../../../app/entities/Product";
import Button from "../../../../../components/atoms/Button";
import { Image } from "../../../../../components/atoms/Image";
import Input from "../../../../../components/atoms/Input";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../../components/molecules/Modal";

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

function EditProductModal({ open, onClose, product }: EditProductModalProps) {
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

  return (
    <Modal open={open}>
      <ModalHeader title="Editar Produto" onClose={() => {
        onClose();
        // reset();
      }} />

      <ModalContent>
        <div className="w-[800px] h-[600px] grid grid-cols-2 gap-2">
          <div className="space-y-4">
            <div>
              <span>Imagem</span>
              <div>
                <Image src={product.image_url} alt={product.name} className="w-[416px] h-[160px]"/>
              </div>
            </div>

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
            
            <Input
              name="cate"
              type="text"
              placeholder="Categoria"
              max={110}
              // {...register("description")}
              // error={errors.description?.message}
            />
          </div>



          <div className="bg-red-400">
            <h1>teste 2</h1>
          </div></div>
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
