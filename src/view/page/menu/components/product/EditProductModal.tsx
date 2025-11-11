import type { Product } from "../../../../../app/entities/Product";
import Button from "../../../../../components/atoms/Button";
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
       <h1>teste</h1>
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
