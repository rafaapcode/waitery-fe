import type { ElementType, ReactNode } from "react";
import Button from "../atoms/Button";
import Modal, { ModalContent, ModalFooter, ModalHeader } from "./Modal";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  icon?: ElementType;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  children?: ReactNode;
}

function ConfirmModal({
  open,
  title,
  description,
  icon,
  onConfirm,
  onCancel,
  isLoading = false,
  children,
}: ConfirmModalProps) {

  return (
    <Modal open={open}>
      <ModalHeader title={title} icon={icon} onClose={onCancel} />

      <ModalContent>
        {children && children}
        {description && (
          <div className="w-full flex justify-center items-center">
            <p className="text-gray-600 w-[60%] text-center">{description}</p>
          </div>
        )}
      </ModalContent>

      <ModalFooter className="flex justify-between">
        <Button
          variant="secondary"
          size="md"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          size="md"
          onClick={onConfirm}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Confirmar
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ConfirmModal;
