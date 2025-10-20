import { useState } from "react";
import { cn } from "../../../app/lib/utils";
import SidebarContent from "./sidebarContent";
import SidebarFooter from "./sidebarFooter";
import SidebarHeader from "./sidebarHeader";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "w-20 flex flex-col items-center pt-2 transition-all duration-500",
        isOpen && "w-64"
      )}
    >
      <SidebarHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <SidebarContent isOpen={isOpen} />
      <SidebarFooter isOpen={isOpen} />
    </div>
  );
}

export default Sidebar;
