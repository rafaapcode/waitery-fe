import * as TabsRDX from "@radix-ui/react-tabs";
import type { ReactNode } from "react";
import { cn } from "../../app/lib/utils";

interface TabsProps {
  children: ReactNode;
  className?: string;
  deafultValue?: string;
}

const Tabs = ({ children, className, deafultValue }: TabsProps) => (
  <TabsRDX.Root className={cn(className)} defaultValue={deafultValue}>
    {children}
  </TabsRDX.Root>
);

export default Tabs;

interface TabsOptionsProps {
  className?: string;
  options?: Array<{ label: string; value: string }>;
}

export function TabsOptions({ className, options }: TabsOptionsProps) {
  return (
    <TabsRDX.List className={cn(className)}>
      {options?.map(({ label, value }) => (
        <TabsRDX.Trigger 
          key={value} 
          className={cn(
            "bg-gray-100 rounded-tl-md px-8 py-2 text-sm transition-colors duration-200",
            "data-[state=active]:bg-gray-100 data-[state=active]:rounded-t-md data-[state=active]:font-semibold data-[state=active]:text-[#D73035]",
            "data-[state=inactive]:text-gray-300 data-[state=inactive]:hover:text-gray-400 data-[state=inactive]:bg-transparent",
            value === "CATEGORIA" && "rounded-tr-md rounded-tl-none"
          )} 
          value={value}
        >
          {label}
        </TabsRDX.Trigger>
      ))}
    </TabsRDX.List>
  );
}

interface TabsContentProps {
  children: ReactNode;
  value: string;
  className?: string;
}

export function TabsContent({ children, value, className }: TabsContentProps) {
  return (
    <TabsRDX.Content className={cn(className)} value={value}>
      {children}
    </TabsRDX.Content>
  );
}
