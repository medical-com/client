import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DashboardPagination } from "@/components/dashboard/dashboard-pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DoctorRow } from "../components/doctor-row";
import { searchFieldOptions } from "../constants";
import { useListDoctorQuery } from "../hooks";
import type { SearchField } from "../types";

const DashboardDoctors = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<SearchField>("name");
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useListDoctorQuery(search, 10, page);

  const searchFieldLabel = searchFieldOptions.find(
    (option) => option.value === searchField,
  )!.label;

  const doctors = (data?.data ?? []).map((doctor) => ({
    id: doctor.id,
    name: `Dr. ${doctor.firstName} ${doctor.lastName}`.trim(),
    specialty: doctor.specialization,
    email: doctor.email,
    phone: doctor.phone,
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
                Doctors
              </h1>
              <p className="mt-3 font-serif text-lg text-primary/60">
                Manage your care team and professional records.
              </p>
            </div>

            <Button
              type="button"
              onClick={() => navigate("/dashboard/admin/doctor/add")}
              className="h-10 rounded-[5px] bg-primary px-4 text-background hover:bg-primary/85"
            >
              <Plus className="size-4" />
              Add doctor
            </Button>
          </div>
        </section>

        <section className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary/40" />
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder={`Search by ${searchFieldLabel.toLowerCase()}...`}
              className="h-10 rounded-[5px] border-primary/10 bg-background pl-9"
            />
          </div>

          <div className="flex rounded-[5px] border border-primary/10 p-1">
            {searchFieldOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSearchField(option.value);
                  setPage(1);
                }}
                className={`rounded-sm px-4 py-2 text-xs font-bold transition-colors ${
                  searchField === option.value
                    ? "bg-primary text-background"
                    : "text-primary/50 hover:text-primary"
                }`}
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
                Loading doctors...
              </p>
            )}

            {!isLoading &&
              !error &&
              doctors.map((doctor) => (
                <DoctorRow key={doctor.id} doctor={doctor} />
              ))}

            {!isLoading && !error && doctors.length === 0 && (
              <p className="px-5 py-10 text-center text-sm text-primary/50">
                No doctors match your search.
              </p>
            )}

            {!isLoading && error && (
              <p className="px-5 py-10 text-center text-sm text-destructive">
                Failed to load doctors.
              </p>
            )}
          </div>
          {data?.pagination && (
            <DashboardPagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
              hasNextPage={data.pagination.hasNextPage}
              onPageChange={setPage}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardDoctors;
