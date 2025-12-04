import { HomeIcon, RotateCcwIcon } from "lucide-react";
import type { Order } from "../../../app/entities/Order";
import { OrderStatus } from "../../../app/entities/Order";
import PageHeader from "../../../components/molecules/PageHeader";
import Column from "./components/Column";
import RestartDayModal from "./components/RestartDayModal";
import { useHomeController } from "./useHomeController";

function Home() {
  const {
    isRestartModalOpen,
    onCloseRestartModal,
    onOpenRestartModal,
    orders
  } = useHomeController();

  const waitingOrders: Order[] = orders?.filter(
    (order) => order.status === OrderStatus.WAITING
  ) || [];

  const inProductionOrders: Order[] = orders?.filter(
    (order) => order.status === OrderStatus.IN_PRODUCTION
  ) || [];

  const doneOrders: Order[] = orders?.filter(
    (order) => order.status === OrderStatus.DONE
  ) || [];
 
  return (
    <main className="w-full h-full">
      <RestartDayModal open={isRestartModalOpen} onClose={onCloseRestartModal} disable={orders?.length === 0 || true} onRestart={() => {}}/>
      <PageHeader  
        icon={HomeIcon}
        title="Home"
        subtitle="Acompanhe os pedidos dos clientes"
        button={{
          onClick: onOpenRestartModal,
          label: "Reiniciar Dia",
          icon: RotateCcwIcon,
          variant: "secondary",
          size: "sm",
        }}
      />

      <section className="flex w-full mt-6 h-[500px] gap-6">
        <Column icon="🕛" name="Fila de Espera" orders={waitingOrders}/>
        <Column icon="🧑‍🍳" name="Em Produção" orders={inProductionOrders}/>
        <Column icon="✅" name="Pronto" orders={doneOrders}/>
      </section>
    </main>
  );
}

export default Home;
