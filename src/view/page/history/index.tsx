import { FileText } from "lucide-react";
import { useOrders } from "../../../app/hooks/queries/useOrders";
import PageHeader from "../../../components/molecules/PageHeader";

import TableSkeleton from "../../../components/TableSkeleton";
import HistoryTable from "./components/HistoryTable";

function History() {
  const { orders, isFetching } = useOrders({});
  

  return (
    <main className="w-full h-full">
      <PageHeader
        icon={FileText}
        title="Histórico"
        subtitle="Visualize pedidos anteriores"
      />

      {isFetching || !orders?.orders && <TableSkeleton />}
      {!isFetching && orders?.orders && <HistoryTable orders={orders?.orders || []}/>}
    </main>
  );
}

export default History;
