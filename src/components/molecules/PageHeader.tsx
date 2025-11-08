import type { LucideIcon } from "lucide-react";
import Button from "../atoms/Button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  iconSize?: number;
  button?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
    variant?: "primary" | "secondary";
    size?: "sm" | "md" | "lg" | "icon";
  };
}

function PageHeader({
  title,
  subtitle,
  icon: Icon,
  iconSize = 32,
  button,
}: PageHeaderProps) {
  return (
    <header className="w-full flex justify-between items-center">
      <div className="flex flex-col gap-4">
        <span className="flex items-center gap-2">
          {Icon && <Icon size={iconSize} className="text-gray-600" />}
          <h1 className="text-2xl font-semibold">{title}</h1>
        </span>
        {subtitle && <p className="text-gray-400">{subtitle}</p>}
      </div>
      {button && (
        <Button
          variant={button.variant || "secondary"}
          size={button.size || "sm"}
          onClick={button.onClick}
        >
          {button.icon && <button.icon size={20} />}
          {button.label}
        </Button>
      )}
    </header>
  );
}

export default PageHeader;