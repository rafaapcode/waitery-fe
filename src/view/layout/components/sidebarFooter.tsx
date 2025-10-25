import { User } from "lucide-react";
import { Activity } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "../../../app/lib/utils";
import DropDownMenu from "../../../components/molecules/DropdownMenu";

interface SidebarFooterProps {
  isOpen: boolean;
}

function SidebarFooter({ isOpen }: SidebarFooterProps) {
  const { pathname } = useLocation();

  const isSelected = pathname === "/profile" || pathname === "/org";

  return (
    <div
      className={cn(
        "h-full w-full px-2 py-4 flex flex-col items-center justify-end gap-4",
        isOpen && "items-start"
      )}
    >
      <DropDownMenu>
        <button
          className={cn(
            "flex text-gray-500 border border-transparent  rounded-md p-2 text-sm items-center gap-2 transition-colors duration-200 hover:bg-gray-100 hover:border-gray-200 cursor-pointer",
            isSelected && "border-red-400 text-red-700",
            isOpen && "w-full"
          )}
        >
          {/* Foto usuário */}
          <User size={22} />
          <Activity mode={isOpen ? "visible" : "hidden"}>
            <p className="sm:sr-only md:not-sr-only">Nome do usuário</p>
          </Activity>
        </button>
      </DropDownMenu>
    </div>
  );
}

export default SidebarFooter;
