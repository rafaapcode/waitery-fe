
import { use } from "react";
import { TableContext } from "../context/TableContext";

const useTable = () => {
  const ctx = use(TableContext);

  if (!ctx) {
    throw new Error('Table deveria ser usado somente dentro de um contexto de tabela.')
  }

  return ctx;
}

export default useTable;
