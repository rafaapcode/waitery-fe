import { SidebarIcon } from 'lucide-react';
import { type Dispatch, type SetStateAction } from 'react';
import { cn } from '../../../app/lib/utils';

interface SidebarHeaderProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function SidebarHeader({ isOpen, setIsOpen }: SidebarHeaderProps) {
  return (
        <div className="flex flex-col w-full items-center gap-6">
        <div
          role="button"
          className={cn(
            "flex justify-center cursor-pointer w-full px-4",
            isOpen && "justify-end"
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <SidebarIcon size={18} />
        </div>
      </div>
  )
}

export default SidebarHeader