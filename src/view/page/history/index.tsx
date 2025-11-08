import { FileText } from "lucide-react";
import TableProvider from "../../../app/context/TableContext";
import useCreateTable from "../../../app/hooks/useCreateTable";
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
    table: "INV001",
    date: "07/12/2022",
    name: "Frango, Cerveja e Batata Frita",
    category: "🥩 Carne",
    total: "R$250,00",
    actions: "Ações",
  },
  {
    table: "INV002",
    date: "08/12/2022",
    name: "Pizza Margherita e Refrigerante",
    category: "🍕 Pizza",
    total: "R$150,00",
    actions: "Ações",
  },
  {
    table: "INV003",
    date: "09/12/2022",
    name: "Hambúrguer Clássico e Batata",
    category: "🍔 Lanches",
    total: "R$350,00",
    actions: "Ações",
  },
  {
    table: "INV004",
    date: "10/12/2022",
    name: "Lasanha à Bolonhesa e Suco",
    category: "🍝 Massas",
    total: "R$450,00",
    actions: "Ações",
  },
  {
    table: "INV005",
    date: "11/12/2022",
    name: "Picanha na Chapa Completa",
    category: "🥩 Carne",
    total: "R$550,00",
    actions: "Ações",
  },
  {
    table: "INV006",
    date: "12/12/2022",
    name: "Salada Caesar e Água Mineral",
    category: "🥗 Saladas",
    total: "R$200,00",
    actions: "Ações",
  },
  {
    table: "INV007",
    date: "13/12/2022",
    name: "Sushi Variado e Chá Gelado",
    category: "🍱 Japonesa",
    total: "R$300,00",
    actions: "Ações",
  },
];

function History() {
  const table = useCreateTable(orders, [
    { accessorKey: "table", header: "Mesa" },
    { accessorKey: "date", header: "Data" },
    { accessorKey: "name", header: "Nome" },
    { accessorKey: "category", header: "Categoria" },
    { accessorKey: "total", header: "Total" },
    { accessorKey: "actions", header: "Ações" },
  ]);

  return (
    <main className="w-full h-full">
      {/* <OrderDetailModal 
        
      /> */}
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
                {orders.map((order) => (
                  <TableRow
                    key={order.table}
                    className="border-b border-gray-300"
                  >
                    <TableCell className="font-medium">{order.table}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.category}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell className="flex justify-end"><HistoryActionComponent /></TableCell>
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
