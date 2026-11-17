export const StatusBadge = ({ status }: { status: string }) => {
  const isActive = status === "Active";

  return (
    <div className="flex items-center gap-2 rounded-[5px] border border-primary/10 px-4 py-2.5">
      <span
        className={`size-2 rounded-full ${isActive ? "bg-accent" : "bg-primary/30"}`}
      />

      <span className="text-xs font-bold">{status}</span>
    </div>
  );
};
