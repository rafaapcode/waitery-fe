import { Activity, type ReactNode } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, children }: { children: ReactNode; open: boolean;}) => (
  createPortal(<Activity mode={open ? "visible" : "hidden"}>
    <div className="bg-black/70 absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white p-6 rounded-md max-w-[95%] max-h-[95%]">
        {children}
      </div>
    </div>
  </Activity>, document.body)
  
);

export default Modal;

export function ModalHeader({ children }: { children: ReactNode }) {
  return (
    <header className="w-full">
      {children}
    </header>
  )
}
