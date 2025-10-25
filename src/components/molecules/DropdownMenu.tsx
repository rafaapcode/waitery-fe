import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Building, LogOut, User2Icon } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/hooks/useAuth";
import { cn } from "../../app/lib/utils";

interface DropDownMenuProps {
  children: React.ReactNode;
}

const DropDownMenu = ({ children }: DropDownMenuProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const [open, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen((prev) => !prev);
  const logout = () => {
    signOut();
    navigate("/signin");
  }

  const isProfileSelected = pathname === "/profile";
  const isOrgSelected = pathname === "/org";

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
          <DropdownMenu.Item
            className="hover:bg-gray-100 cursor-pointer"
            onClick={handleOpen}
          >
            <NavLink
              to="/profile"
              className={cn(
                "w-full text-gray-400 hover:text-red-700 flex gap-2 transition-colors duration-200",
                isProfileSelected && "border-red-400 text-red-700"
              )}
            >
              <User2Icon size={20} />
              Seu perfil
            </NavLink>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="hover:bg-gray-100 cursor-pointer"
            onClick={handleOpen}
          >
            <NavLink
              to="/org"
              className={cn(
                "w-full text-gray-400 hover:text-red-700 flex gap-2 transition-colors duration-200",
                isOrgSelected && "border-red-400 text-red-700"
              )}
            >
              <Building size={20} />
              Organização
            </NavLink>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            asChild
            className="hover:bg-gray-100 cursor-pointer"
          >
            <button onClick={logout} className="w-full text-gray-400 hover:text-red-700 flex gap-2 transition-colors duration-200">
              <LogOut size={20} />
              Sair
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DropDownMenu;
