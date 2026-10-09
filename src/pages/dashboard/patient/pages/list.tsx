import { Search } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { PatientRow } from "../components/patient-row";
import { searchFieldOptions } from "../constants";
import { useListPatientQuery } from "../hooks";
import type { SearchField } from "../types";

const DashboardPatients = () => {
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<SearchField>("name");
  const { data, isLoading, error } = useListPatientQuery(searchField, search);

  const searchFieldLabel = searchFieldOptions.find(
    (option) => option.value === searchField,
  )!.label;

  const patients = (data?.data ?? []).map((patient) => ({
    id: patient.id,
    name: `${patient.firstName} ${patient.lastName}`.trim(),
    email: patient.email,
    phone: patient.phone,
    lastVisit: "—",
    status: "Active" as const,
  }));

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 lg:px-10">
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-extrabold tracking-[0.22em] text-accent">
                RECEPTION DESK
              </p>

              <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                Patients
              </h1>

              <p className="mt-3 font-serif text-lg text-primary/60">
                Manage patient records and appointment history.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary/40" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search by ${searchFieldLabel.toLowerCase()}...`}
              className="h-10 rounded-[5px] border-primary/10 bg-background pl-9"
            />
          </div>

          <div className="flex rounded-[5px] border border-primary/10 p-1">
            {searchFieldOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSearchField(option.value)}
                className={`
                  rounded-sm px-4 py-2 text-xs font-bold
                  transition-colors
                  ${
                    searchField === option.value
                      ? "bg-primary text-background"
                      : "text-primary/50 hover:text-primary"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[5px] border border-primary/10">
          <div className="divide-y divide-primary/10">
            {isLoading && (
              <p className="px-5 py-10 text-center text-sm text-primary/50">
                Loading patients...
              </p>
            )}

            {!isLoading &&
              !error &&
              patients.map((patient) => (
                <PatientRow key={patient.id} patient={patient} />
              ))}

            {!isLoading && !error && patients.length === 0 && (
              <p className="px-5 py-10 text-center text-sm text-primary/50">
                No patients match your search.
              </p>
            )}

            {!isLoading && error && (
              <p className="px-5 py-10 text-center text-sm text-destructive">
                Failed to load patients.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPatients;
