import * as RadioGroupRDX from "@radix-ui/react-radio-group";
import type { ReactNode } from "react";
import { cn } from "../../app/lib/utils";

interface RadioGroupProps {
  children: ReactNode;
  className?: string;
  onValueChange?: (value: string) => void;
  value?: string;
}

function RadioGroup({
  children,
  className,
  onValueChange,
  value,
}: RadioGroupProps) {
  return (
    <RadioGroupRDX.Root className={cn("flex", className)} onValueChange={onValueChange} value={value}>
      {children}
    </RadioGroupRDX.Root>
  );
}

export default RadioGroup;

export function RadioGroupItem({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <RadioGroupRDX.Item
        value={value}
        className="flex items-center justify-center gap-2 cursor-pointer bg-white border-2 border-red-700 size-6 rounded-full "
      >
        <RadioGroupRDX.Indicator className="size-4 bg-red-700 rounded-full" />
      </RadioGroupRDX.Item>
      {children}
    </div>
  );
}
