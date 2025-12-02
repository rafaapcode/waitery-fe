import Checkbox from "../atoms/Checkbox";

interface IngredientOptionProps {
  icon: string;
  name: string;
  checked?: boolean;
  id: string;
  onChange?: (checked: boolean) => void;
}

function IngredientOption({ icon, name, checked, onChange }: IngredientOptionProps) {
  return (
    <div className="w-full flex justify-between items-center border border-gray-400 rounded-md p-3 text-sm">
      <span>{icon} {name}</span>
      <Checkbox checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export default IngredientOption;
