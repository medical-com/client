import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AppointmentFilterDropdownProps = {
  label: string;
  value: string;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export const AppointmentFilterDropdown = ({
  label,
  value,
  placeholder,
  options,
  onChange,
  disabled = false,
}: AppointmentFilterDropdownProps) => {
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? placeholder;

  return (
    <div className="grid min-w-0 flex-1 gap-1.5 sm:min-w-48">
      <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary/45">
        {label}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={disabled}
          className="flex h-10 w-full items-center justify-between gap-3 rounded-[5px] border border-primary/15 bg-background px-3 text-left text-sm font-medium shadow-sm outline-none transition-colors hover:border-primary/30 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className={value ? "truncate" : "truncate text-primary/50"}>
            {selectedLabel}
          </span>
          <ChevronDown className="size-4 shrink-0 text-primary/45" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-(--anchor-width) rounded-[5px] p-1"
        >
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={(nextValue) => onChange(nextValue ?? "")}
          >
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuRadioItem value="">
              {placeholder}
            </DropdownMenuRadioItem>
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
