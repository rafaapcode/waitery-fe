import { Search } from "lucide-react";
import { useState } from "react";
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

function IngredientsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenCreateIngredientModal, setIsOpenCreateIngredientModal] = useState(false);

  const toggleCreateIngredientModal = () => setIsOpenCreateIngredientModal((prev) => !prev);

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
        {ingredients.filter(ing => ing.name.includes(searchTerm)).map((ingredient) => (
          <IngredientOption
            key={ingredient.id}
            name={ingredient.name}
            id={ingredient.id}
          />
        ))}
      </div>
    </div>
  );
}

export default IngredientsList;
