import { HomeIcon, RotateCcwIcon } from "lucide-react";
import Button from "../../../components/atoms/Button";
import Column from "./components/Column";
import RestartDayModal from "./components/RestartDayModal";
import { useHomeController } from "./useHomeController";

function Home() {
  const {
    isRestartModalOpen,
    onCloseRestartModal,
    onOpenRestartModal,
  } = useHomeController();

  return (
    <main className="w-full h-full">
      <RestartDayModal open={isRestartModalOpen} onClose={onCloseRestartModal} />
      <header className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2">
            <HomeIcon size={32} className="text-gray-600" />
            <h1 className="text-2xl font-semibold">Home</h1>
          </span>
          <p className="text-gray-400">Acompanhe os pedidos dos clientes</p>
        </div>
        <Button variant="secondary" size="sm" onClick={onOpenRestartModal}>
          <RotateCcwIcon size={20} />
          Reiniciar Dia
        </Button>
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
