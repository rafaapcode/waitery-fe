function ColumnSkeleton() {
  return (
    <section className="flex w-full mt-6 h-[500px] gap-6">
      <div className="flex flex-col p-4 border border-gray-50 bg-gray-100 animate-pulse rounded-lg flex-1 h-full" />
      <div className="flex flex-col p-4 border border-gray-50 bg-gray-100 animate-pulse rounded-lg flex-1 h-full" />
      <div className="flex flex-col p-4 border border-gray-50 bg-gray-100 animate-pulse rounded-lg flex-1 h-full" />
    </section>
  );
}

export default ColumnSkeleton;
