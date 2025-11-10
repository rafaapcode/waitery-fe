import { SquareMenu } from "lucide-react";
import PageHeader from "../../../components/molecules/PageHeader";
import Tabs, {
  TabsContent,
  TabsOptions,
} from "../../../components/molecules/Tabs";
import CategoryTable from "./components/CategoryTable";
import ProductsTable from "./components/ProductsTable";

function Menu() {
  return (
    <main className="w-full h-full">
      <PageHeader
        icon={SquareMenu}
        title="Cardápio"
        subtitle="Gerencie os produtos do seu estabelecimento"
      />

      <section className="mt-12">
        <Tabs deafultValue="PRODUTOS">
          <TabsOptions
            options={[
              { label: "Produtos", value: "PRODUTOS" },
              { label: "Categoria", value: "CATEGORIA" },
            ]}
          />

          <TabsContent value="PRODUTOS" className="mt-8">
            <ProductsTable />
          </TabsContent>
          <TabsContent value="CATEGORIA" className="mt-8">
            <CategoryTable />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export default Menu;
