import { HomeIcon, RotateCcwIcon } from "lucide-react";
import Modal from "../../../components/molecules/Modal";
import Column from "./components/Column";

function Home() {
  return (
    <main className="w-full h-full">
      <Modal open >
        <h1>Testando</h1>
      </Modal>
      <header className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2">
            <HomeIcon size={32} className="text-gray-600" />
            <h1 className="text-2xl font-semibold">Home</h1>
          </span>
          <p className="text-gray-400">Acompanhe os pedidos dos clientes</p>
        </div>
        <button className="flex items-center gap-2 text-red-700 hover:text-red-600 transition-colors duration-150">
          <RotateCcwIcon size={20} />
          Reiniciar Dia
        </button>
      </header>

      <section className="flex w-full mt-6 h-[500px] gap-6">
        <Column icon="🕛" name="Fila de Espera" orders={[{table: "Mesa 10", itens: ["Item 1", "Item 2"]}]}/>
        <Column icon="🧑‍🍳" name="Em Produção" orders={[{table: "Mesa 11", itens: ["Item 3"]}]}/>
        <Column icon="✅" name="Pronto" orders={[{table: "Mesa 12", itens: ["Item 4", "Item 5"]}]}/>
      </section>
    </main>
  );
}

export default Home;
