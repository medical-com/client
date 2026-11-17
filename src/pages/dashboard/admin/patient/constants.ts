import type { SearchField } from "./types";

export const searchFieldOptions: { value: SearchField; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];
