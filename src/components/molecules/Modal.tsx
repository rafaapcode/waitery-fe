import { X } from "lucide-react";
import { Activity, type ElementType, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "../atoms/Button";

const Modal = ({ open, children }: { children: ReactNode; open: boolean;}) => (
  createPortal(<Activity mode={open ? "visible" : "hidden"}>
    <div className="bg-black/70 absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white p-6 rounded-md max-w-[930px] max-h-[970px] min-w-[400px]">
        {children}
      </div>
    </div>
  </Activity>, document.body)
  
);

export default Modal;

interface ModalHeaderProps {
  title: string;
  icon?: ElementType;
  onClose: () => void;
}

export function ModalHeader({ title, icon: Icon, onClose }: ModalHeaderProps) {
  return (
    <header className="w-full flex justify-between items-center">
      <span className="flex items-center gap-2">
        {Icon && <Icon className="text-gray-600" size={18} />}
        <h2 className="text-lg font-semibold">{title}</h2>
      </span>
      <Button onClick={onClose} variant="secondary" size="icon" className="text-gray-400 hover:text-gray-600">
        <X size={18} />
      </Button>
    </header>
  )
}


export function ModalContent({ children }: {children: ReactNode}) {
  return (
    <section className="w-full max-h-full mt-6 overflow-y-auto">
      {children}
    </section>
  )
}

export function ModalFooter({ children }: {children: ReactNode}) {
  return (
    <footer className="w-full mt-4">
      {children}
    </footer>
  )
}