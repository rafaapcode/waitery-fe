import Modal, { ModalContent, ModalFooter, ModalHeader } from "./molecules/Modal";

interface OrderDetailModalProps {
  open: boolean
  onClose: () => void
  order: {table: string; status: string; itens: string[]} | null;
}

function OrderDetailModal({ open, onClose, order }: OrderDetailModalProps) {

  if (!order) {
    return null;
  }

  return (
    <Modal open={open}>
      <ModalHeader
        title={order.table}
        onClose={onClose}
      />
      <ModalContent>
        <div className="w-full flex flex-col gap-4">
          <h1>teste</h1>
        </div>
      </ModalContent>

      <ModalFooter>
        <></>
        {/* <div className="w-full flex  justify-between items-center">
          <Button variant="secondary" size="md" onClick={onClose}>Não, continuar pedidos</Button>
          <Button onClick={() => {}} size="md">Sim, reiniciar o dia</Button>
        </div> */}
      </ModalFooter>
    </Modal>
  )
}

export default OrderDetailModal