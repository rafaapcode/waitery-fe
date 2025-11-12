import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "../../../../../components/atoms/Button";
import Input from "../../../../../components/atoms/Input";
import IngredientOption from "../../../../../components/molecules/IngredientOption";
import CreateIngredientModal from "./CreateIngredientModal";

const ingredients = [
  { id: "1", name: "🧀 Mussarela" },
  { id: "2", name: "🍅 Tomate" },
  { id: "3", name: "🧄 Alho" },
  { id: "4", name: "🧅 Cebola" },
  { id: "5", name: "🌿 Manjericão" },
  { id: "6", name: "🥓 Bacon" },
  { id: "7", name: "🥚 Ovo" },
  { id: "8", name: "🥬 Alface" },
  { id: "9", name: "🫒 Azeitona" },
  { id: "10", name: "🌶️ Pimenta" },
];

interface IngredientsListProps {
  ingredientsSelected?: string[];
}

function IngredientsList({ ingredientsSelected }: IngredientsListProps) {
  const { control } = useFormContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [isOpenCreateIngredientModal, setIsOpenCreateIngredientModal] =
    useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const toggleCreateIngredientModal = () =>
    setIsOpenCreateIngredientModal((prev) => !prev);

  const handleToggleIngredient = (ingredient: { id: string }) => {
    if (selectedIngredients.has(ingredient.id)) {
      const index = fields.findIndex((field: any) => field.id === ingredient.id);
      remove(index);
      setSelectedIngredients(prev => {
        const newSet = new Set(prev);
        newSet.delete(ingredient.id);
        return newSet;
      });
    } else {
      append(ingredient.id);
      setSelectedIngredients((prev) => {
        const newSet = new Set(prev);
        newSet.add(ingredient.id);
        return newSet;
      });
    }
  };

  useEffect(() => {
    setSelectedIngredients(new Set(ingredientsSelected || []));
    return () => setSelectedIngredients(new Set());
  }, [ingredientsSelected]);

  return (
    <div className="w-full h-full">
      <CreateIngredientModal
        open={isOpenCreateIngredientModal}
        onClose={toggleCreateIngredientModal}
      />
      <header className="flex justify-between items-center">
        <p className="text-gray-500">Ingredientes</p>
        <Button
          variant="secondary"
          size="xs"
          className="text-sm"
          onClick={toggleCreateIngredientModal}
        >
          Novo Ingrediente
        </Button>
      </header>

      <div className="flex flex-col gap-2 mt-4">
        <Input
          icon={Search}
          placeholderText="Ex: Quatro Queijos"
          name="search-ingredient"
          type="text"
          placeholder="Buscar ingrediente"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-2 mt-2 max-h-full overflow-y-auto w-full">
        {ingredients
          .filter((ing) => ing.name.includes(searchTerm))
          .map((ingredient) => (
            <IngredientOption
              key={ingredient.id}
              name={ingredient.name}
              id={ingredient.id}
              checked={selectedIngredients.has(ingredient.id)}
              onChange={() => handleToggleIngredient(ingredient)}
            />
          ))}
      </div>
    </div>
  );
}

export default IngredientsList;
