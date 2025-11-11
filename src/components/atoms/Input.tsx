import { CircleX } from "lucide-react";
import type { ElementType } from "react";
import { type ComponentProps, forwardRef } from "react";
import { cn } from "../../app/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
  isLoading?: boolean;
  placeholderText?: string;
  icon?: ElementType;
  onIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, name, id, className, placeholder, placeholderText, isLoading, icon: Icon, onIconClick, ...props }, ref) => {
    const inputId = id ?? name;

    if (isLoading) {
      return (
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor={inputId} className="text-gray-300 text-sm bg-gray-300 animate-pulse w-1/12 rounded-md">
            label
          </label>
          <input
            id={inputId}
            name={name}
            {...props}
            disabled
            className="outline-none p-3 rounded-lg bg-gray-300 animate-pulse"
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor={inputId} className="text-gray-600 text-sm">
          {placeholder}
        </label>
        <div className="relative w-full">
          <input
            ref={ref}
            id={inputId}
            name={name}
            {...props}
            placeholder={placeholderText}
            className={cn(
              "placeholder-gray-200 placeholder:text-sm outline-none transition-all duration-100 border p-3 rounded-lg border-gray-300 focus:border-red-500 w-full" ,
              error && "border-red-500 focus:border-red-500",
              Icon && "pr-10",
              className
            )}
          />
          {Icon && (
            <button
              type="button"
              onClick={onIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Icon size={18} />
            </button>
          )}
        </div>
        {error && (
          <span className="text-xs text-red-800 flex items-center gap-1">
            <CircleX size={14} />
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
