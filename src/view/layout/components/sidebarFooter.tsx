import { Building, LogOutIcon, User } from "lucide-react";
import { Activity } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";
import { cn } from "../../../app/lib/utils";
import DropDownMenu, {
  type OptionsType,
} from "../../../components/molecules/DropdownMenu";

interface SidebarFooterProps {
  isOpen: boolean;
}

{
  /* <NavLink
              to="/profile"
              className={cn(
                "w-full text-gray-400 hover:text-red-700 flex gap-2 transition-colors duration-200",
                isProfileSelected && "border-red-400 text-red-700"
              )}
            >
              <User2Icon size={20} />
              Seu perfil
            </NavLink> */
}

function SidebarFooter({ isOpen }: SidebarFooterProps) {
  const { pathname } = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const isSelected = pathname === "/profile" || pathname === "/org";
  const logout = () => {
    signOut();
    navigate("/signin");
  }

  const opts: OptionsType[] = [
    {
      type: "link",
      label: "Seu perfil",
      icon: User,
      to: "/profile",
      isSelected: function(){ return pathname === this.to } ,
    },
    {
      type: "link",
      label: "Organização",
      icon: Building,
      to: "/org",
      isSelected: function(){ return pathname === this.to } ,
    },
    {
      type: "button",
      label: "Sair",
      icon: LogOutIcon,
      isSelected: function(){ return pathname === this.to } ,
      onClick: logout 
    }
  ];

  return (
    <div
      className={cn(
        "h-full w-full px-2 py-4 flex flex-col items-center justify-end gap-4",
        isOpen && "items-start"
      )}
    >
      <DropDownMenu options={opts}>
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
