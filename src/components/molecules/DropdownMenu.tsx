import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState, type ElementType, type ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../app/lib/utils";

export type OptionsType = {
  type: "link" | "button";
  label: string;
  icon: ElementType;
  isSelected?: () => boolean;
  to?: string;
  onClick?: () => void;
};

interface DropDownMenuProps {
  children: ReactNode;
  options: OptionsType[];
}

const DropDownMenu = ({ children, options }: DropDownMenuProps) => {
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
          {options.map((opt, idx) => (
            <DropdownMenu.Item
              key={idx}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={handleOpen}
            >
              {opt.type === "link" && opt.to && (
                <NavLink
                  to={opt.to}
                  className={cn(
                    "w-full text-gray-400 hover:text-red-700 flex gap-2 transition-colors duration-200",
                    opt.isSelected?.() && "border-red-400 text-red-700"
                  )}
                >
                  <opt.icon size={20} />
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
                  <opt.icon size={20} />
                  {opt.label}
                </button>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropDownMenu;
