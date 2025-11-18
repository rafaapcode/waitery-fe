import { HistoryIcon, Home, SquareMenu, UsersIcon } from "lucide-react";
import { Activity, type ElementType } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { toListOrg } from "../../../app/entities/Org";
import { useOrgs } from "../../../app/hooks/queries/useOrgs";
import { useAuth } from "../../../app/hooks/useAuth";
import { cn } from "../../../app/lib/utils";
import SelectOrg from "./selectOrg";

interface SidebarContentProps {
  isOpen: boolean;
}

type MenuOption = {
  path: string;
  title: string;
  icon: ElementType;
  isActive: (currentPath: string) => boolean;
};

const organizations = [
  {
    id: "1",
    name: "Restaurante Sabor & Arte",
    logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  },
  {
    id: "2",
    name: "Pizzaria Bella Napoli",
    logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: "3",
    name: "Burger House Premium",
    logo: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: "4",
    name: "Sushi Master",
    logo: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
  },
];

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
  const { setOrg, user } = useAuth();
  const { orgs, isFetching } = useOrgs({});

  const handleSetOrg = (id: string) => {
    const org = organizations.find((org) => org.id === id);
    if (org) {
      setOrg({
        orgId: org.id,
        name: org.name,
        imgUrl: org.logo,
      });
    }
  };

  return (
    <div
      className={cn(
        "h-full w-full px-2 py-4 flex flex-col items-center gap-4",
        isOpen && "items-start"
      )}
    >
      <SelectOrg
        isLoading={isFetching}
        orgId={user?.org.id}
        orgImageUrl={user?.org.image_url}
        isOpen={isOpen}
        selectOrg={handleSetOrg}
        organizations={toListOrg(orgs || [])}
      />
      {sidebarOptions.map((opt, idx) => (
        <NavLink
          key={idx}
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
