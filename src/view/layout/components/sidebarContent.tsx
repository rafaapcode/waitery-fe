import { HistoryIcon, Home, SquareMenu, UsersIcon } from "lucide-react";
import { Activity, type ElementType } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../../app/lib/utils";

interface SidebarContentProps {
  isOpen: boolean;
}

type MenuOption = {
  path: string;
  title: string;
  icon: ElementType;
  isActive: (currentPath: string) => boolean;
};

const sidebarOptions: MenuOption[] = [
  {
    path: "/",
    title: "Início",
    icon: Home,
    isActive(currentpath: string) {
      return currentpath === this.path;
    },
  },
  {
    path: "/historico",
    title: "Histórico",
    icon: HistoryIcon,
    isActive(currentpath: string) {
      return currentpath === this.path;
    },
  },
  {
    path: "/cardapio",
    title: "Cardapio",
    icon: SquareMenu,
    isActive(currentpath: string) {
      return currentpath === this.path;
    },
  },
  {
    path: "/usuarios",
    title: "Usuarios",
    icon: UsersIcon,
    isActive(currentpath: string) {
      return currentpath === this.path;
    },
  },
];

function SidebarContent({ isOpen }: SidebarContentProps) {
  const { pathname } = useLocation();

  return (
    <div
      className={cn(
        "h-full w-full px-2 py-4 flex flex-col items-center gap-4",
        isOpen && "items-start"
      )}
    >
      {sidebarOptions.map((opt) => (
        <NavLink
          to={opt.path}
          className={cn(
            "flex text-gray-500 border border-transparent  rounded-md p-2 text-sm items-center gap-2 transition-colors duration-200",
            opt.isActive(pathname)
              ? "border-red-400 text-red-700"
              : "hover:bg-gray-100 hover:border-gray-200",
            isOpen && "w-full"
          )}
        >
          <opt.icon size={22} />
          <Activity mode={isOpen ? "visible" : "hidden"}>
            <p className="sm:sr-only md:not-sr-only">{opt.title}</p>
          </Activity>
        </NavLink>
      ))}
    </div>
  );
}

export default SidebarContent;
