import type { Category } from "../../../../app/entities/Category";
import useCreateTable from "../../../../app/hooks/useCreateTable";
import { cn } from "../../../../app/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/molecules/Table";
import CategoryActionComponent from "./CategoryActionTable";

const categories: Category[] = [
  {
    id: "1",
    org_id: "org-123",
    name: "Carnes",
    icon: "🥩",
  },
  {
    id: "2",
    org_id: "org-123",
    name: "Pizza",
    icon: "🍕",
  },
  {
    id: "3",
    org_id: "org-123",
    name: "Lanches",
    icon: "🍔",
  },
  {
    id: "4",
    org_id: "org-123",
    name: "Massas",
    icon: "🍝",
  },
  {
    id: "5",
    org_id: "org-123",
    name: "Saladas",
    icon: "🥗",
  },
  {
    id: "6",
    org_id: "org-123",
    name: "Bebidas",
    icon: "🥤",
  },
  {
    id: "7",
    org_id: "org-123",
    name: "Sobremesas",
    icon: "🍰",
  },
  {
    id: "8",
    org_id: "org-123",
    name: "Japonesa",
    icon: "🍱",
  },
];

function CategoryTable() {
  const table = useCreateTable(categories, [
    { accessorKey: "icon", header: "Emoji" },
    { accessorKey: "name", header: "Nome" },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => <CategoryActionComponent category={row.original} />,
    },
  ]);

  return (
    <div className="w-full h-[400px] overflow-y-auto">
      <Table className="w-full border border-gray-300">
        <TableHeader className="bg-gray-100 rounded-md">
          {table.headerGroups.map((headerGroup) => (
            <TableRow className="border-none" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const isTableHeader = header.isHeader("icon");
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
            <TableRow key={row.id} className="border-b border-gray-300">
              {row.cells.map((cell) => (
                <>
                  <TableCell className="p-3">{cell.value}</TableCell>
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoryTable;
