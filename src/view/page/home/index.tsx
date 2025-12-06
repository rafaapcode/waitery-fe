import { HomeIcon, RotateCcwIcon } from "lucide-react";
import PageHeader from "../../../components/molecules/PageHeader";
import Column from "./components/Column";
import ColumnSkeleton from "./components/ColumnSkeleton";
import RestartDayModal from "./components/RestartDayModal";
import { useHomeController } from "./useHomeController";

function Home() {
  const {
    isRestartModalOpen,
    onCloseRestartModal,
    onOpenRestartModal,
    orders,
    doneOrders,
    inProductionOrders,
    waitingOrders,
    restartOrdersMutation,
    isFetching
  } = useHomeController();
 
  return ( 
    <main className="w-full h-full">
      <RestartDayModal isLoading={restartOrdersMutation.isPending} open={isRestartModalOpen} onClose={onCloseRestartModal} disable={orders?.length === 0} onRestart={restartOrdersMutation.restartOrders}/>
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

      {isFetching && <ColumnSkeleton />}
      {!isFetching && <section className="flex w-full mt-6 h-[500px] gap-6">
        <Column icon="🕛" name="Fila de Espera" orders={waitingOrders}/>
        <Column icon="🧑‍🍳" name="Em Produção" orders={inProductionOrders}/>
        <Column icon="✅" name="Pronto" orders={doneOrders}/>
      </section>}
    </main>
  );
}

export default Home;
