import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../app/lib/utils";


const badgetVariants = cva(
  [
    "rounded-md text-sm font-semibold",
  ],
  {
    variants: {
      variant: {
        default: "border border-gray-300 text-black",
        primary: "border border-neutral-400 bg-neutral-700 text-white",
        success: "border border-green-500 bg-green-200 text-green-700",
        error: "border border-red-500 bg-red-200 text-red-700",
        info: "border border-blue-500 bg-blue-200 text-blue-700",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-3 py-1.5",
        lg: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

interface BadgetProps
  extends ComponentProps<"span">,
    VariantProps<typeof badgetVariants> {
  isLoading?: boolean;
  children: ReactNode;
}


function Badget({ children, variant, size, className, ...props }: BadgetProps) {
  return (
    <span {...props} className={cn(badgetVariants({variant, size}),className )}>{children}</span>
  )
}

export default Badget