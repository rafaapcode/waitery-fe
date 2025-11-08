import type { Table } from "@tanstack/react-table";
import { createContext, type ReactNode } from "react";

export interface ITableContextValue {
  table: Table<any>;
}

interface TableContextProps {
  children: ReactNode;
  table: Table<any>;
}

export const TableContext = createContext<ITableContextValue>(
  {} as ITableContextValue
);


function TableProvider({ children, table }: TableContextProps) {
  return <TableContext.Provider value={{ table }}>{children}</TableContext.Provider>;
}

export default TableProvider;
