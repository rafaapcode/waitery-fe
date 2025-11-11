import { X } from "lucide-react";
import {
  Activity,
  type ComponentProps,
  type ElementType,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "../../app/lib/utils";
import Button from "../atoms/Button";

type ModalPriority = "low" | "medium" | "high" | "critical";

const priorityZIndex: Record<ModalPriority, string> = {
  low: "z-0",
  medium: "z-20",
  high: "z-30",
  critical: "z-40",
};

interface ModalProps {
  children: ReactNode;
  open: boolean;
  priority?: ModalPriority;
  nativeHidden?: boolean;
}

const Modal = ({
  open,
  children,
  priority = "low",
  nativeHidden = true,
}: ModalProps) => {
  if (!nativeHidden) {
    if(!open) return null;
    return createPortal(
      <div
        className={cn(
          "bg-black/70 absolute top-0 left-0 w-full h-full flex justify-center items-center",
          priorityZIndex[priority]
        )}
      >
        <div className="flex flex-col gap-6 bg-white p-6 rounded-md max-w-[95%] max-h-[97%] min-w-1/6">
          {children}
        </div>
      </div>,
      document.body
    );
  }

  return createPortal(
    <Activity mode={open ? "visible" : "hidden"}>
      <div
        className={cn(
          "bg-black/70 absolute top-0 left-0 w-full h-full flex justify-center items-center",
          priorityZIndex[priority]
        )}
      >
        <div className="flex flex-col gap-6 bg-white p-6 rounded-md max-w-[95%] max-h-[97%] min-w-1/6">
          {children}
        </div>
      </div>
    </Activity>,
    document.body
  );
};

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
        <h2 className="text-xl font-semibold">{title}</h2>
      </span>
      <Button
        onClick={onClose}
        variant="secondary"
        size="icon"
        className="text-gray-400 hover:text-gray-600"
      >
        <X size={18} />
      </Button>
    </header>
  );
}

export function ModalContent({ children }: { children: ReactNode }) {
  return (
    <section className="w-full max-h-full mt-6 overflow-y-auto">
      {children}
    </section>
  );
}

interface ModalFooterProps extends ComponentProps<"footer"> {
  children: ReactNode;
}

export function ModalFooter({
  children,
  className,
  ...props
}: ModalFooterProps) {
  return (
    <footer className={cn("w-full mt-4", className)} {...props}>
      {children}
    </footer>
  );
}
