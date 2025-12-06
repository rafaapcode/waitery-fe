import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./molecules/Table";

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
}

function TableSkeleton({ columns = 4, rows = 5 }: TableSkeletonProps) {
  return (
    <div className="w-full mt-4 h-[400px] overflow-y-auto">
      <Table className="w-full h-full border border-gray-300 shadow">
        <TableHeader className="bg-gray-100 rounded-md">
          <TableRow className="border-none">
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={index}>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className="border-b border-gray-300">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <TableCell key={colIndex} className="p-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableSkeleton;