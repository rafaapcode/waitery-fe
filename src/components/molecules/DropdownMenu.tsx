import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState, type ElementType, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../app/lib/utils";

export type OptionsType = {
  type: "link" | "button" | "option";
  label: string;
  icon: ElementType | string;
  isSelected?: () => boolean;
  to?: string;
  onClick?: () => void;
  value?: string;
};

interface DropDownMenuProps {
  children: ReactNode;
  options: OptionsType[];
  onSelect?: (value: {value?: string , label: string} | undefined) => void;
}

const DropDownMenu = ({ children, options, onSelect }: DropDownMenuProps) => {
  const [open, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setIsOpen}> 
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={5}
          align="start"
          alignOffset={10}
          className="bg-gray-100 shadow border border-gray-300 rounded-lg p-4 space-y-4"
        >
          {!options.length && <p>Nenhuma opção disponível</p>}
          {options.map((opt, idx) => (
            <DropdownMenu.Item
              key={idx}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={handleOpen}
              onSelect={() => onSelect?.({value: opt.value, label: opt.label})}
            >
              {opt.type === "link" && opt.to && (
                <NavLink
                  to={opt.to}
                  className={cn(
                    "w-full text-gray-400 hover:text-red-700 flex gap-2 transition-colors duration-200",
                    opt.isSelected?.() && "border-red-400 text-red-700"
                  )}
                >
                  {typeof opt.icon === "string" ? (
                    <span>{opt.icon}</span>
                  ) : (
                    <opt.icon size={20} />
                  )}
                  {opt.label}
                </NavLink>
              )}
              {opt.type === "button" && opt.onClick && (
                <button
                  onClick={opt.onClick}
                  className={cn(
                    "w-full text-gray-400 hover:text-red-700 flex gap-2 transition-colors duration-200 cursor-pointer",
                    opt.isSelected?.() && "border-red-400 text-red-700"
                  )}
                >
                   {typeof opt.icon === "string" ? (
                    <span>{opt.icon}</span>
                  ) : (
                    <opt.icon size={20} />
                  )}
                  {opt.label}
                </button>
              )}
              {opt.type === "option" && (
                <span className="w-full px-4 py-2 hover:bg-white rounded transition-all duration-150">{typeof opt.icon === "string" ? opt.icon : <opt.icon size={20} />} {opt.label}</span>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropDownMenu;
