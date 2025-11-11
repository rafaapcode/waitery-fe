import type { Product } from "../../../../../app/entities/Product";
import useCreateTable from "../../../../../app/hooks/useCreateTable";
import { formatCurrency } from "../../../../../app/lib/formatCurrency";
import { cn } from "../../../../../app/lib/utils";
import { Image } from "../../../../../components/atoms/Image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../../components/molecules/Table";
import ProductsActionComponent from "./ProductsActionTable";

const produtos: Product[] = [
  {
    id: "1",
    org_id: "org-123",
    name: "Pizza Margherita",
    description: "Pizza clássica com molho de tomate, mussarela e manjericão fresco",
    image_url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002",
    price: 45.90,
    ingredients: [],
    category: {
      id: "2",
      org_id: "org-123",
      name: "Pizza",
      icon: "🍕",
    },
    discounted_price: 0,
    discount: false,
  },
  {
    id: "2",
    org_id: "org-123",
    name: "Hambúrguer Clássico",
    description: "Hambúrguer artesanal com queijo, alface, tomate e molho especial",
    image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    price: 32.00,
    ingredients: [],
    category: {
      id: "3",
      org_id: "org-123",
      name: "Lanches",
      icon: "🍔",
    },
    discounted_price: 28.80,
    discount: true,
  },
  {
    id: "3",
    org_id: "org-123",
    name: "Picanha na Chapa",
    description: "Picanha nobre grelhada ao ponto com acompanhamentos",
    image_url: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976",
    price: 89.90,
    ingredients: [],
    category: {
      id: "1",
      org_id: "org-123",
      name: "Carnes",
      icon: "🥩",
    },
    discounted_price: 0,
    discount: false,
  },
  {
    id: "4",
    org_id: "org-123",
    name: "Lasanha à Bolonhesa",
    description: "Lasanha tradicional com molho bolonhesa e queijo gratinado",
    image_url: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3",
    price: 42.50,
    ingredients: [],
    category: {
      id: "4",
      org_id: "org-123",
      name: "Massas",
      icon: "🍝",
    },
    discounted_price: 0,
    discount: false,
  },
  {
    id: "5",
    org_id: "org-123",
    name: "Salada Caesar",
    description: "Salada com alface romana, croutons, parmesão e molho caesar",
    image_url: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    price: 28.00,
    ingredients: [],
    category: {
      id: "5",
      org_id: "org-123",
      name: "Saladas",
      icon: "🥗",
    },
    discounted_price: 24.00,
    discount: true,
  },
  {
    id: "6",
    org_id: "org-123",
    name: "Refrigerante",
    description: "Refrigerante gelado 350ml",
    image_url: "https://images.unsplash.com/photo-1554866585-cd94860890b7",
    price: 6.50,
    ingredients: [],
    category: {
      id: "6",
      org_id: "org-123",
      name: "Bebidas",
      icon: "🥤",
    },
    discounted_price: 5.50,
    discount: true,
  },
  {
    id: "7",
    org_id: "org-123",
    name: "Cheesecake de Frutas Vermelhas",
    description: "Cheesecake cremoso com calda de frutas vermelhas",
    image_url: "https://images.unsplash.com/photo-1533134242820-bb986efd6be7",
    price: 22.90,
    ingredients: [],
    category: {
      id: "7",
      org_id: "org-123",
      name: "Sobremesas",
      icon: "🍰",
    },
    discounted_price: 0,
    discount: false,
  },
  {
    id: "8",
    org_id: "org-123",
    name: "Combinado de Sushi",
    description: "20 peças variadas de sushi e sashimi",
    image_url: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
    price: 78.00,
    ingredients: [],
    category: {
      id: "8",
      org_id: "org-123",
      name: "Japonesa",
      icon: "🍱",
    },
    discounted_price: 0,
    discount: false,
  },
];

function ProductsTable() {
   const table = useCreateTable(produtos, [
    { accessorKey: "image_url", header: "Imagem", cell: ({ row }) => <Image src={row.original.image_url} alt={row.original.name} size="xs" /> },
    { accessorKey: "name", header: "Nome" },
    { accessorKey: "category", header: "Categoria", cell: ({ row }) => row.original.category.name },
    { accessorKey: "price", header: "Preço", cell: ({ row }) => formatCurrency(row.original.price) },
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

                const headerStyle = cn(
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
                  <TableCell key={cell.id} className="p-3">{cell.value}</TableCell>
                </>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductsTable