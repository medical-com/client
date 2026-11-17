type QuickActionProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const QuickAction = ({ icon, title, description }: QuickActionProps) => {
  return (
    <button
      type="button"
      className="
        group flex items-center gap-4
        rounded-[5px] border border-primary/10
        p-5 text-left
        transition-colors
        hover:bg-primary hover:text-background
      "
    >
      <span className="text-accent">{icon}</span>

      <span>
        <span className="block font-semibold">{title}</span>

        <span className="mt-1 block text-xs text-primary/50 group-hover:text-background/60">
          {description}
        </span>
      </span>
    </button>
  );
};
