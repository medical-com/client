const statusStyles: Record<string, string> = {
  scheduled: "border-sky-200 bg-sky-50 text-sky-700",
  confirmed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  completed: "border-blue-200 bg-blue-50 text-blue-700",
  cancelled: "border-red-200 bg-red-50 text-red-700",
  no_show: "border-amber-200 bg-amber-50 text-amber-700",
};

const statusLabels: Record<string, string> = {
  scheduled: "Scheduled",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  no_show: "No show",
};

export const StatusBadge = ({ status }: { status: string }) => {
  const styles = statusStyles[status] ?? "border-primary/10 bg-background text-primary";
  const label = statusLabels[status] ?? status;

  return (
    <div
      className={`flex items-center gap-2 rounded-[5px] border px-4 py-2.5 ${styles}`}
    >
      <span className="size-2 rounded-full bg-current" />

      <span className="text-xs font-bold">{label}</span>
    </div>
  );
};
