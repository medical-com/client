import { ArrowLeft } from "lucide-react";

export const SectionTab = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-current={active ? "page" : undefined}
    className={`border-b-2 px-1 pb-3 text-sm font-bold transition-colors ${
      active
        ? "border-accent text-primary"
        : "border-transparent text-primary/45 hover:text-primary"
    }`}
  >
    {children}
  </button>
);

export const PageMessage = ({
  message,
  onBack,
}: {
  message: string;
  onBack: () => void;
}) => (
  <div className="min-h-screen bg-background px-5 py-10 text-primary">
    <button
      type="button"
      onClick={onBack}
      className="flex items-center gap-2 text-xs font-bold text-primary/50 transition-colors hover:text-primary"
    >
      <ArrowLeft className="size-4" />
      Back to doctors
    </button>
    <p className="mt-10 text-center text-sm text-primary/50">{message}</p>
  </div>
);
