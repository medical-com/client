import type { PatientFieldProps } from "../types";

export const PatientField = ({ label, value, icon }: PatientFieldProps) => {
  return (
    <div>
      <p className="mb-2 text-xs font-bold text-primary/40">{label}</p>

      <div className="flex items-center gap-2">
        {icon && <span className="text-primary/40">{icon}</span>}

        <p className="font-serif text-base font-bold">{value}</p>
      </div>
    </div>
  );
};
