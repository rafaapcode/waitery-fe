import { LoaderCircleIcon, SquareMenu } from "lucide-react";
import Button from "../../../components/atoms/Button";
import PageHeader from "../../../components/molecules/PageHeader";
import Tabs, {
  TabsContent,
  TabsOptions,
} from "../../../components/molecules/Tabs";
import CategoryTable from "./components/category/CategoryTable";
import CreateCategoryModal from "./components/category/CreateCategoryModal";
import CreateProductModal from "./components/product/CreateProductModal";
import ProductsTable from "./components/product/ProductsTable";
import { useMenuController } from "./useMenuController";

function Menu() {
  const {
    newCategoryModalOpen,
    toggleNewCategoryModal,
    newProductModalOpen,
    toggleNewProductModal,
    categories,
  } = useMenuController();

  return (
    <main className="w-full h-full">
      <CreateCategoryModal
        open={newCategoryModalOpen}
        onClose={toggleNewCategoryModal}
      />

      <CreateProductModal
        onClose={toggleNewProductModal}
        open={newProductModalOpen}
      />

      <PageHeader
        icon={SquareMenu}
        title="Cardápio"
        subtitle="Gerencie os produtos do seu estabelecimento"
      />

      <Tabs
        deafultValue="PRODUTOS"
        className="mt-4 flex-1"
      >
        <TabsOptions
          options={[
            { label: "Produtos", value: "PRODUTOS" },
            { label: "Categoria", value: "CATEGORIA" },
          ]}
        />

        <TabsContent value="PRODUTOS" className="mt-2">
          <div className="p-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">Produtos</h2>
              <span className="px-1 py-0.5 bg-gray-300 rounded-md text-xs font-semibold">
                3
              </span>
            </div>
            <Button variant="secondary" onClick={toggleNewProductModal}>
              Novo Produto
            </Button>
          </div>
          <ProductsTable />
        </TabsContent>

        <TabsContent value="CATEGORIA" className="mt-2">
          <div className="p-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">Categorias</h2>
              <span className="px-1 py-0.5 bg-gray-300 rounded-md text-xs font-semibold">
                {categories.categories?.length || 0}
              </span>
            </div>
            <Button variant="secondary" onClick={toggleNewCategoryModal}>
              Nova Categoria
            </Button>
          </div>
          {categories.isFetching && (
            <div className="flex-1 flex justify-center items-center p-10">
              <LoaderCircleIcon
                size={28}
                className="text-red-700 animate-spin"
              />
            </div>
          )}
          {!categories.isFetching && (
            <CategoryTable categories={categories.categories || []} />
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default Menu;
