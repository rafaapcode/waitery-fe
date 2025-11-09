import { type ColumnDef, flexRender, getCoreRowModel, type TableOptions, useReactTable } from "@tanstack/react-table";

function useCreateTable<TData>(data: TData[], columns: ColumnDef<TData>[], options?: Omit<TableOptions<TData>, "columns" | "data" | "getCoreRowModel">) {
  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 5,
    },
    getCoreRowModel: getCoreRowModel(),
    ...options
  });

  const headerGroups = table.getHeaderGroups().map(headerGroup => {
    
    const customHeaders = headerGroup.headers.map(header => {
      const title = flexRender(header.column.columnDef.header, header.getContext());
      return {
        ...header,
        headerTitle: title,
        isHeader: (id: string) => id === header.id
      }
    })

    return {
      ...headerGroup,
      headers: customHeaders
    }
  });

  const rows = table.getRowModel().rows.map(row => {
    const cells = row.getAllCells().map(cell => ({
      ...cell,
      value: flexRender(cell.column.columnDef.cell, cell.getContext())
    }));
    return {
      ...row,
      cells
    }
  });

      
  return {...table, headerGroups, rows };
}

export default useCreateTable;
