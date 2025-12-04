import { RotateCcwIcon } from "lucide-react";
import Button from "../../../../components/atoms/Button";
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "../../../../components/molecules/Modal";

interface RestartDayModalProps {
  open: boolean;
  onClose: () => void;
  onRestart: () => void;
  disable?: boolean;
  isLoading?: boolean;
}

function RestartDayModal({ open, onClose, onRestart, disable, isLoading }: RestartDayModalProps) {
  return (
    <Modal open={open}>
      <ModalHeader
        icon={RotateCcwIcon}
        title="Reiniciar Dia"
        onClose={onClose}
      />
      <ModalContent>
        <div className="w-full flex flex-col text-center items-center gap-6">
          <p className="w-[60%] font-medium">
            Ao reiniciar o dia, todos os pedidos serão arquivados no status
            atual.
          </p>

          <p className="w-[60%] font-medium">
            Deseja reiniciar o dia ?
          </p>
        </div>
      </ModalContent>

      <ModalFooter>
        <div className="w-full flex  justify-between items-center">
          <Button variant="secondary" size="md" onClick={onClose}>Não, continuar pedidos</Button>
          <Button isLoading={isLoading} onClick={onRestart} size="md" disabled={disable}>Sim, reiniciar o dia</Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default RestartDayModal;
