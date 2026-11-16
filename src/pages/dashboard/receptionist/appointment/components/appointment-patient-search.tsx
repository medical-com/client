import { ChevronDown, Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import type { AppointmentPatientSearchField } from "../hooks";

type AppointmentPatientSearchProps = {
  value: string;
  field: AppointmentPatientSearchField;
  onChange: (value: string) => void;
  onFieldChange: (value: AppointmentPatientSearchField) => void;
  onSearch: () => void;
};

export const AppointmentPatientSearch = ({
  value,
  field,
  onChange,
  onFieldChange,
  onSearch,
}: AppointmentPatientSearchProps) => {
  const options: Array<{
    value: AppointmentPatientSearchField;
    label: string;
  }> = [
    { value: "name", label: "Name" },
    { value: "pesel", label: "PESEL" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone number" },
  ];
  const selectedLabel = options.find((option) => option.value === field)?.label;

  return (
    <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,320px)_auto]">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex h-10 w-full items-center justify-between gap-3 rounded-[5px] border border-primary/15 bg-background px-3 text-left text-sm font-medium shadow-sm outline-none transition-colors hover:border-primary/30 focus:border-accent focus:ring-2 focus:ring-accent/20"
          aria-label="Patient search field"
        >
          <span className="truncate">{selectedLabel}</span>
          <ChevronDown className="size-4 shrink-0 text-primary/45" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-(--anchor-width) rounded-[5px] p-1"
        >
          <DropdownMenuRadioGroup
            value={field}
            onValueChange={(nextValue) =>
              onFieldChange(nextValue as AppointmentPatientSearchField)
            }
          >
            <DropdownMenuLabel>Search by</DropdownMenuLabel>
            {options.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary/40" />
        <Input
          placeholder={`Search by ${field === "phone" ? "phone number" : field}`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSearch();
          }}
          className="h-10 rounded-[5px] border-primary/10 bg-background pl-9"
        />
      </div>
      <button
        type="button"
        onClick={onSearch}
        disabled={!value.trim()}
        className="h-9 rounded-[5px] bg-primary px-2 lg:w-50 text-xs font-bold text-background transition-colors hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Search
      </button>
    </div>
  );
};
