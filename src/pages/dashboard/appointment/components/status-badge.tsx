export const StatusBadge = ({ status }: { status: string }) => {
  return (
    <div className="flex items-center gap-2 rounded-[5px] border border-primary/10 px-4 py-2.5">
      <span className="size-2 rounded-full bg-accent" />

      <span className="text-xs font-bold">{status}</span>
    </div>
  );
};
