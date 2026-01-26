import type { Product } from "../../../../../app/entities/Product";
import useCreateTable from "../../../../../app/hooks/useCreateTable";
import { formatCurrency } from "../../../../../app/lib/formatCurrency";
import { cn } from "../../../../../app/lib/utils";
import { Image } from "../../../../../components/atoms/Image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../components/molecules/Table";
import ProductsActionComponent from "./ProductsActionTable";

function ProductsTable({ produtos }: { produtos: Product[] }) {
  const table = useCreateTable(produtos, [
    {
      accessorKey: "image_url",
      header: "Imagem",
      cell: ({ row }) => (
        <Image src={row.original.image_url} alt={row.original.name} size="xs" />
      ),
    },
    { accessorKey: "name", header: "Nome" },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) =>
        `${row.original.category.icon} ${row.original.category.name}`,
    },
    {
      accessorKey: "price",
      header: "Preço",
      cell: ({ row }) => formatCurrency(row.original.price),
    },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => <ProductsActionComponent product={row.original} />,
    },
  ]);
  return (
    <div className="w-full h-[400px] overflow-y-auto">
      <Table className="w-full border border-gray-300">
        <TableHeader className="bg-gray-100 rounded-md">
          {table.headerGroups.map((headerGroup) => (
            <TableRow className="border-none" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isActionHeader = header.isHeader("actions");

                const headerStyle = cn(isActionHeader && "text-right");

                return (
                  <TableHead
                    key={`HEADER-${header.id}`}
                    className={headerStyle}
                  >
                    {header.headerTitle}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.rows.map((row) => (
            <TableRow key={row.id} className="border-b border-gray-300">
              {row.cells.map((cell) => (
                <>
                  <TableCell key={`CELL-${cell.id}`} className="p-3">
                    {cell.value}
                  </TableCell>
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductsTable;
