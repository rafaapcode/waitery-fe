import Button from "../../../../components/atoms/Button";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../components/molecules/Modal";

interface CreateOrgModalProps {
  open: boolean;
  onClose: () => void;
}

function CreateOrgModal({ open, onClose }: CreateOrgModalProps) {

  return (
    <Modal open={open}>
      <ModalHeader
        title="Editar Produto"
        onClose={() => {
          onClose();
        }}
      />

      <ModalContent>
        <div className="w-[800px] max-h-[600px] grid grid-cols-2 gap-2">
          <h1>teste</h1>
        </div>
      </ModalContent>

      <ModalFooter className="w-full flex justify-end items-center">
        <Button
          // disabled={!isValid || !isDirty || isSubmitting}
          // isLoading={isSubmitting}
          size="md"
          onClick={() => {}}
        >
          Criar Organização
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateOrgModal;
