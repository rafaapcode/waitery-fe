import { FileText } from "lucide-react";
import TableProvider from "../../../app/context/TableContext";
import useCreateTable from "../../../app/hooks/useCreateTable";
import PageHeader from "../../../components/molecules/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/molecules/Table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

function History() {
  const table = useCreateTable(invoices, [
    { accessorKey: "invoice" },
    { accessorKey: "paymentStatus" },
    { accessorKey: "paymentMethod" },
    { accessorKey: "totalAmount" },
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
              3
            </span>
          </h2>

          <div className="w-full mt-4 h-[400px] overflow-y-auto">
            <Table className="w-full h-full border border-gray-300 shadow">
              <TableHeader className="bg-gray-100 rounded-md">
                <TableRow className="border-none">
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow
                    key={invoice.invoice}
                    className="border-b border-gray-300"
                  >
                    <TableCell className="font-medium">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      {invoice.totalAmount}
                    </TableCell>
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
