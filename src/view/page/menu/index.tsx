import { SquareMenu } from "lucide-react";
import { useState } from "react";
import Button from "../../../components/atoms/Button";
import PageHeader from "../../../components/molecules/PageHeader";
import Tabs, {
  TabsContent,
  TabsOptions,
} from "../../../components/molecules/Tabs";
import CategoryTable from "./components/category/CategoryTable";
import CreateCategoryModal from "./components/category/CreateCategoryModal";
import ProductsTable from "./components/product/ProductsTable";

function Menu() {
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);

  const toggleNewCategoryModal = () => {
    setNewCategoryModalOpen((prev) => !prev);
  };

  return (
    <main className="w-full h-full">
      <CreateCategoryModal
        open={newCategoryModalOpen}
        onClose={toggleNewCategoryModal}
      />

      <PageHeader
        icon={SquareMenu}
        title="Cardápio"
        subtitle="Gerencie os produtos do seu estabelecimento"
      />

      <Tabs deafultValue="PRODUTOS" className="mt-6 flex-1">
        <TabsOptions
          options={[
            { label: "Produtos", value: "PRODUTOS" },
            { label: "Categoria", value: "CATEGORIA" },
          ]}
        />

        <TabsContent value="PRODUTOS" className="mt-2">
          <ProductsTable />
        </TabsContent>

        <TabsContent value="CATEGORIA" className="mt-2">
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">Categorias</h2>
              <span className="px-1 py-0.5 bg-gray-300 rounded-md text-xs font-semibold">
                3
              </span>
            </div>
            <Button variant="secondary" onClick={toggleNewCategoryModal}>
              Nova Categoria
            </Button>
          </div>
          <CategoryTable />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default Menu;
