import * as CheckboxRDX from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import type { ComponentProps } from "react";

interface CheckboxProps extends ComponentProps<typeof CheckboxRDX.Root> {}

function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxRDX.Root className="bg-gray-100 border data-[state=checked]:bg-red-100 border-gray-100 transition-all duration-150 data-[state=checked]:border-red-400 rounded size-4 flex justify-center items-center p-2" {...props}>
      <CheckboxRDX.Indicator>
        <CheckIcon size={10} className="text-red-600"/>
      </CheckboxRDX.Indicator>
    </CheckboxRDX.Root>
  );
}

export default Checkbox;
