import { flexRender } from "@tanstack/react-table";
import { FileText } from "lucide-react";
import TableProvider from "../../../app/context/TableContext";
import { fromHistoryOrder, OrderStatus, toHistoryOrder, type Order } from "../../../app/entities/Order";
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

const orders = [
     {
       id: "4",
       org_id: "org-123",
       status: OrderStatus.DONE,
       created_at: new Date("2025-11-06T09:50:00"),
       total_price: 89.70,
       quantity: 5,
       table: "Mesa 12",
       products: [
         {
           name: "Picanha na Chapa",
           quantity: 1,
           price: 65.00,
           category: "Carnes",
           discount: false,
         },
         {
           name: "Arroz",
           quantity: 1,
           price: 8.00,
           category: "Acompanhamentos",
           discount: false,
         },
         {
           name: "Feijão",
           quantity: 1,
           price: 6.00,
           category: "Acompanhamentos",
           discount: false,
         },
         {
           name: "Salada",
           quantity: 1,
           price: 5.70,
           category: "Acompanhamentos",
           discount: false,
         },
         {
           name: "Cerveja",
           quantity: 1,
           price: 5.00,
           category: "Bebidas",
           discount: true,
         }
       ],
     },
     {
       id: "5",
       org_id: "org-123",
       status: OrderStatus.DONE,
       created_at: new Date("2025-11-06T09:30:00"),
       total_price: 35.00,
       quantity: 3,
       table: "Mesa 3",
       products: [
         {
           name: "Salada Caesar",
           quantity: 1,
           price: 18.00,
           category: "Saladas",
           discount: false,
         },
         {
           name: "Água Mineral",
           quantity: 2,
           price: 8.50,
           category: "Bebidas",
           discount: false,
         },
       ],
     },
];

function History() {
  const table = useCreateTable(toHistoryOrder(orders), [
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
              {orders.length}
            </span>
          </h2>

          <div className="w-full mt-4 h-[400px] overflow-y-auto">
            <Table className="w-full h-full border border-gray-300 shadow">
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
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b border-gray-300"
                  >
                    {
                      row.getAllCells().map(cell => (
                        <>
                          <TableCell>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
