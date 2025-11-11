import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../../../../../components/atoms/Button";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../../components/molecules/Modal";
import { editCategoryFormSchema, type EditCategoryFormData } from "../../schemas/editCategorySchema";

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateProductModal({ open, onClose }: CreateProductModalProps) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<EditCategoryFormData>({
    resolver: zodResolver(editCategoryFormSchema),
    mode: "onChange"
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onClose();
  });

  return (
    <Modal open={open}>
      <ModalHeader title="Novo Produto" onClose={() => {
        onClose();
        reset();
      }} />

      <ModalContent>
        <h1>Teste</h1>
      </ModalContent>

      <ModalFooter className="w-full flex justify-end items-center">
        <Button
          disabled={!isValid || !isDirty || isSubmitting}
          isLoading={isSubmitting}
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
