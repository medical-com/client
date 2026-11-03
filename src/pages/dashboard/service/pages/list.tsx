import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardPagination } from "@/components/dashboard-pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useListDoctorQuery, type ClientDoctor } from "../../doctor/hooks";
import {
  serviceCategories,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useFindOneServiceQuery,
  useListServiceQuery,
  useUpdateServiceMutation,
  type ServiceCategory,
} from "../hooks";

type ServiceForm = {
  name: string;
  description: string;
  category: ServiceCategory;
  duration: string;
  doctorIds: string;
};

const emptyForm: ServiceForm = {
  name: "",
  description: "",
  category: "general",
  duration: "30",
  doctorIds: "",
};

const label = (value: string) =>
  value.replace("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const doctorName = (doctor: ClientDoctor) =>
  `Dr. ${doctor.firstName} ${doctor.lastName}`.trim();

const DashboardServices = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string>();
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const { data, isLoading, error } = useListServiceQuery(search, page);
  const {
    data: doctorsData,
    isLoading: doctorsLoading,
    error: doctorsError,
  } = useListDoctorQuery("", 100);
  const selected = useFindOneServiceQuery(editingId);
  const create = useCreateServiceMutation();
  const update = useUpdateServiceMutation();
  const remove = useDeleteServiceMutation();
  const isEditing = Boolean(editingId);
  const isAdding = editingId === "new";

  const edit = (id: string) => {
    navigate(`/dashboard/service/${id}`);
  };

  const cancel = () => {
    setEditingId(undefined);
    setForm(emptyForm);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      duration: Number(form.duration),
      doctorIds: form.doctorIds
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
    };
    if (editingId && editingId !== "new") {
      await update.mutateAsync({ ...payload, id: editingId });
    } else {
      await create.mutateAsync(payload);
    }
    cancel();
  };

  return (
    <main className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 lg:px-10">
      <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-extrabold tracking-[0.22em] text-accent">
            RECEPTION DESK
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            Services
          </h1>
          <p className="mt-3 font-serif text-lg text-primary/60">
            Manage the services available to patients.
          </p>
        </div>
        {!isEditing && (
          <Button
            type="button"
            onClick={() => setEditingId("new")}
            className="h-10 rounded-[5px] bg-primary px-4 text-background hover:bg-primary/85"
          >
            <Plus className="size-4" /> Add service
          </Button>
        )}
      </section>

      {isEditing && (
        <div
          className={
            isAdding
              ? "fixed inset-0 z-50 flex items-center justify-center bg-primary/30 p-5 backdrop-blur-sm"
              : undefined
          }
          role={isAdding ? "dialog" : undefined}
          aria-modal={isAdding ? true : undefined}
          aria-label={isAdding ? "Add service" : undefined}
        >
          <form
            onSubmit={submit}
            className={
              isAdding
                ? "max-h-[calc(100vh-2.5rem)] w-full max-w-2xl overflow-y-auto rounded-lg border border-primary/10 bg-background p-6 shadow-2xl sm:p-8"
                : "mb-8 max-w-3xl border-y border-primary/10 py-6"
            }
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold">
                {editingId === "new" ? "Add service" : "Edit service"}
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={cancel}
                aria-label="Close"
              >
                <X className="size-4" />
              </Button>
            </div>
            {selected.isError && (
              <p className="mb-4 text-sm text-destructive">
                Failed to load the selected service.
              </p>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                label="Name"
                value={form.name}
                onChange={(value) => setForm({ ...form, name: value })}
                required
              />
              <FormField
                label="Duration (minutes)"
                type="number"
                value={form.duration}
                onChange={(value) => setForm({ ...form, duration: value })}
                required
              />
              <div className="grid gap-2">
                <Label className="text-xs font-bold text-primary/60">
                  Category
                </Label>
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      category: event.target.value as ServiceCategory,
                    })
                  }
                  className="h-11 rounded-[5px] border border-primary/10 bg-background px-3 text-sm"
                >
                  {serviceCategories.map((category) => (
                    <option key={category} value={category}>
                      {label(category)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label className="text-xs font-bold text-primary/60">
                  Doctors
                </Label>
                <div className="max-h-48 overflow-y-auto rounded-[5px] border border-primary/10">
                  {doctorsLoading && (
                    <p className="px-3 py-4 text-sm text-primary/50">
                      Loading doctors...
                    </p>
                  )}
                  {doctorsError && (
                    <p className="px-3 py-4 text-sm text-destructive">
                      Failed to load doctors.
                    </p>
                  )}
                  {!doctorsLoading &&
                    !doctorsError &&
                    doctorsData?.data.length === 0 && (
                      <p className="px-3 py-4 text-sm text-primary/50">
                        No doctors found.
                      </p>
                    )}
                  {!doctorsLoading &&
                    !doctorsError &&
                    doctorsData?.data.map((doctor) => {
                      const checked = form.doctorIds
                        .split(",")
                        .map((id) => id.trim())
                        .includes(doctor.id);

                      return (
                        <label
                          key={doctor.id}
                          className="flex cursor-pointer items-center gap-3 border-b border-primary/10 px-3 py-3 last:border-0 hover:bg-primary/5"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(event) => {
                              const selectedIds = form.doctorIds
                                .split(",")
                                .map((id) => id.trim())
                                .filter(Boolean);
                              const nextIds = event.target.checked
                                ? [...selectedIds, doctor.id]
                                : selectedIds.filter((id) => id !== doctor.id);
                              setForm({
                                ...form,
                                doctorIds: nextIds.join(", "),
                              });
                            }}
                            className="size-4 accent-accent"
                          />
                          <span className="text-sm">{doctorName(doctor)}</span>
                          <span className="ml-auto text-xs text-primary/50">
                            {doctor.specialization}
                          </span>
                        </label>
                      );
                    })}
                </div>
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label className="text-xs font-bold text-primary/60">
                  Description
                </Label>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  required
                  className="min-h-24 rounded-[5px] border border-primary/10 bg-background p-3 text-sm outline-none focus:border-accent"
                />
              </div>
            </div>
            {(create.error || update.error) && (
              <p className="mt-4 text-sm text-destructive" role="alert">
                {(create.error || update.error)?.message}
              </p>
            )}
            <div className="mt-6 flex justify-end">
              <Button
                type="submit"
                disabled={create.isPending || update.isPending}
                className="bg-primary text-background"
              >
                {create.isPending || update.isPending
                  ? "Saving..."
                  : "Save service"}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary/40" />
        <Input
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search services..."
          className="h-10 rounded-[5px] border-primary/10 bg-background pl-9"
        />
      </div>
      <section className="overflow-hidden rounded-[5px] border border-primary/10">
        {isLoading && (
          <p className="px-5 py-10 text-center text-sm text-primary/50">
            Loading services...
          </p>
        )}
        {!isLoading && error && (
          <p className="px-5 py-10 text-center text-sm text-destructive">
            Failed to load services.
          </p>
        )}
        {!isLoading && !error && data?.data.length === 0 && (
          <p className="px-5 py-10 text-center text-sm text-primary/50">
            No services match your search.
          </p>
        )}
        {!isLoading &&
          !error &&
          data?.data.map((service) => (
            <div
              key={service.id}
              className="flex items-center gap-4 border-b border-primary/10 px-5 py-4 last:border-0"
            >
              <div className="min-w-0 flex-1">
                <p className="font-serif text-base font-bold">{service.name}</p>
                <p className="mt-1 text-xs text-primary/50">
                  {label(service.category)} · {service.duration} minutes ·{" "}
                  {service.description}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => edit(service.id)}
                aria-label={`Edit ${service.name}`}
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-destructive"
                disabled={remove.isPending}
                onClick={() => {
                  if (window.confirm(`Delete ${service.name}?`))
                    remove.mutate(service.id);
                }}
                aria-label={`Delete ${service.name}`}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
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
  );
};

const FormField = ({
  label: fieldLabel,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) => (
  <div className="grid gap-2">
    <Label className="text-xs font-bold text-primary/60">{fieldLabel}</Label>
    <Input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required={required}
      className="h-11 rounded-[5px] border-primary/10 bg-background"
    />
  </div>
);

export default DashboardServices;
