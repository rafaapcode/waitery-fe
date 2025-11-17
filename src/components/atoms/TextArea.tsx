import { CircleX } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "../../app/lib/utils";

interface TextAreaProps extends ComponentProps<"textarea"> {
  error?: string;
}

function TextArea({
  className,
  placeholder,
  id,
  error,
  ...props
}: TextAreaProps) {
  return (
    <div>
      <label htmlFor={id} className="text-gray-600 text-sm">
        {placeholder}
      </label>
      <textarea
        {...props}
        className={cn(
          "transition-all duration-200 w-full border border-gray-300 rounded-lg outline-none p-3 focus:border-red-500",
          error && "border-red-500 focus:border-red-500",
          className
        )}
      />
      {error && (
        <span className="text-xs text-red-800 flex items-center gap-1">
          <CircleX size={14} />
          {error}
        </span>
      )}
    </div>
  );
}

export default TextArea;
