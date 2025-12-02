import { FileText } from "lucide-react";
import TableProvider from "../../../app/context/TableContext";
import { fromHistoryOrder, toHistoryOrder, type Order } from "../../../app/entities/Order";
import { useOrders } from "../../../app/hooks/queries/useOrders";
import useCreateTable from "../../../app/hooks/useCreateTable";
import { formatCurrency } from "../../../app/lib/formatCurrency";
import { cn } from "../../../app/lib/utils";
import PageHeader from "../../../components/molecules/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/molecules/Table";
import HistoryActionComponent from "./components/HistoryActionComponent";

function History() {
  const { orders } = useOrders({});

  const table = useCreateTable(toHistoryOrder(orders?.orders || []), [
    { accessorKey: "table", header: "Mesa" },
    { accessorKey: "date", header: "Data" },
    { accessorKey: "name", header: "Nome" },
    { accessorKey: "category", header: "Categoria" },
    { accessorKey: "total", header: "Total", cell: ({row}) => formatCurrency(row.original.total) },
    { accessorKey: "actions", header: "Ações", cell: ({row}) => <HistoryActionComponent order={fromHistoryOrder(row.original) as Order}/> },
  ]);

  return (
    <main className="w-full h-full">
      <PageHeader
        icon={FileText}
        title="Histórico"
        subtitle="Visualize pedidos anteriores"
      />

      <TableProvider table={table}>
        <section className="mt-12">
          <h2 className="font-semibold">
            Pedidos{" "}
            <span className="bg-gray-200 px-1 py-0.5 text-sm rounded-md">
              {orders?.orders.length || 0}
            </span>
          </h2>

          <div className="w-full mt-4 h-[400px] overflow-y-auto">
            <Table className="w-full h-full border border-gray-300">
              <TableHeader className="bg-gray-100 rounded-md">
                {table.headerGroups.map((headerGroup) => (
                  <TableRow className="border-none" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const isTableHeader = header.isHeader("table");
                      const isActionHeader = header.isHeader("actions");

                      const headerStyle = cn(
                        isTableHeader && "w-[100px]",
                        isActionHeader && "text-right"
                      );

                      return (
                        <TableHead key={header.id} className={headerStyle}>
                          {header.headerTitle}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-gray-300"
                  >
                    {
                      row.cells.map(cell => (
                        <>
                          <TableCell className="p-3">{cell.value}</TableCell>
                        </>
                      ))
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </TableProvider>
    </main>
  );
}

export default History;
