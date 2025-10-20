import { User } from "lucide-react";
import { Activity } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../../app/lib/utils";

interface SidebarFooterProps {
  isOpen: boolean;
}

function SidebarFooter({ isOpen }: SidebarFooterProps) {
  const { pathname } = useLocation();

  return (
      <div
        className={cn(
          "h-full w-full px-2 py-4 flex flex-col items-center justify-end gap-4",
          isOpen && "items-start"
        )}
      >
        <NavLink
          to="/profile"
          className={cn(
            "flex text-gray-500 border border-transparent  rounded-md p-2 text-sm items-center gap-2 transition-colors duration-200",
            pathname === "/profile"
              ? "border-red-400 text-red-700"
              : "hover:bg-gray-100 hover:border-gray-200",
            isOpen && "w-full"
          )}
        >
          <User size={22} />
          <Activity mode={isOpen ? "visible" : "hidden"}>
            <p className="sm:sr-only md:not-sr-only">Perfil</p>
          </Activity>
        </NavLink>
      </div>
  );
}

export default SidebarFooter;
