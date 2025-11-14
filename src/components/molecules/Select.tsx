import * as SelectRDX from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import {
  type ComponentProps,
  type ElementType,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "../../app/lib/utils";

interface SelectProps extends ComponentProps<typeof SelectRDX.Root> {
  children: ReactNode;
  isLoading?: boolean;
}

function Select({ children, isLoading = false, ...props }: SelectProps) {

  if (isLoading) {
    return <div className="rounded-md p-3 border border-gray-300 min-w-full h-11 bg-gray-200 animate-pulse" />
  }

  return <SelectRDX.Root {...props}>{children}</SelectRDX.Root>;
}

export default Select;

interface SelectTriggerProps extends ComponentProps<typeof SelectRDX.Trigger> {
  placeholder: string;
  Icon?: ElementType;
}

export function SelectTrigger({ className, placeholder, Icon, ...props }: SelectTriggerProps) {
  return (
    <SelectRDX.Trigger {...props} className={cn("rounded-md text-sm flex gap-2 items-center p-3 border border-gray-300 min-w-full justify-between", className)}>
      <SelectRDX.Value placeholder={placeholder} />
      {Icon && (
        <SelectRDX.Icon>
          <Icon size={18} />
        </SelectRDX.Icon>
      )}
    </SelectRDX.Trigger>
  );
}

interface SelectContentProps {
  children?: ReactNode;
  options?: {label: string; value: string}[];
}

export function SelectContent({ children, options }: SelectContentProps) {
 return  <SelectRDX.Portal>
    <SelectRDX.Content position="popper" sideOffset={6}  className="min-w-full p-2 bg-gray-50 rounded-md">
      <SelectRDX.ScrollUpButton>
        <ChevronUpIcon size={18} />
      </SelectRDX.ScrollUpButton>
      <SelectRDX.Viewport className="p-1 min-w-full">
        { children && children}
        { options && options.map((option) => (
          <SelectItem key={option.value} value={option.value} label={option.label} />
        ))}
      </SelectRDX.Viewport>
      <SelectRDX.ScrollDownButton>
        <ChevronDownIcon size={18}/>
      </SelectRDX.ScrollDownButton>
    </SelectRDX.Content>
  </SelectRDX.Portal>;
}

interface SelectItemProps extends ComponentProps<typeof SelectRDX.Item> {
  ref?: Ref<HTMLDivElement>;
  label: string;
  value: string;
}

export function SelectItem({
  ref,
  label,
  value,
  className,
  ...props
}: SelectItemProps) {
  return (
    <SelectRDX.Item className={cn("cursor-pointer flex gap-4 min-w-full items-center p-2 border border-gray-300 hover:bg-gray-200 transition-all duration-150 rounded my-1 outline-none justify-between",className)} {...props} ref={ref} value={value}>
      <SelectRDX.ItemText>{label}</SelectRDX.ItemText>
      <SelectRDX.ItemIndicator>
        <CheckIcon size={16}/>
      </SelectRDX.ItemIndicator>
    </SelectRDX.Item>
  );
}
