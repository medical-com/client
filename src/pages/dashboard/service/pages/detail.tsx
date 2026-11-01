import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useListDoctorQuery, type ClientDoctor } from "../../doctor/hooks";
import {
  serviceCategories,
  useFindOneServiceQuery,
  useUpdateServiceMutation,
  type ServiceCategory,
} from "../hooks";

type ServiceForm = {
  name: string;
  description: string;
  category: ServiceCategory;
  duration: string;
  doctorIds: string[];
};

const label = (value: string) =>
  value.replace("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const doctorName = (doctor: ClientDoctor) =>
  `Dr. ${doctor.firstName} ${doctor.lastName}`.trim();

const DashboardService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: service, isLoading, error } = useFindOneServiceQuery(id);
  const { data: doctorsData, isLoading: doctorsLoading, error: doctorsError } =
    useListDoctorQuery("", 100);
  const update = useUpdateServiceMutation();
  const [form, setForm] = useState<ServiceForm>();

  useEffect(() => {
    if (service) {
      setForm({
        name: service.name,
        description: service.description,
        category: service.category,
        duration: String(service.duration),
        doctorIds: service.doctorIds,
      });
    }
  }, [service]);

  if (isLoading) {
    return (
      <PageMessage
        message="Loading service..."
        onBack={() => navigate("/dashboard/services")}
      />
    );
  }

  if (error || !service || !form) {
    return (
      <PageMessage
        message="Failed to load service."
        onBack={() => navigate("/dashboard/services")}
      />
    );
  }

  const toggleDoctor = (doctorId: string, checked: boolean) => {
    setForm((current) => {
      if (!current) return current;
      return {
        ...current,
        doctorIds: checked
          ? [...current.doctorIds, doctorId]
          : current.doctorIds.filter((id) => id !== doctorId),
      };
    });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!id) return;

    await update.mutateAsync({
      id,
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      duration: Number(form.duration),
      doctorIds: form.doctorIds,
    });
  };

  return (
    <main className="mx-auto w-full max-w-360 px-5 py-10 sm:px-8 lg:px-10">
      <button
        type="button"
        onClick={() => navigate("/dashboard/services")}
        className="mb-8 flex items-center gap-2 text-xs font-bold text-primary/50 transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" />
        Back to services
      </button>

      <section className="mb-10">
        <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
          SERVICE
        </p>
        <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
          {service.name}
        </h1>
        <p className="mt-3 font-serif text-lg text-primary/60">
          Update service details and assigned doctors.
        </p>
      </section>

      <form onSubmit={submit} className="max-w-3xl border-t border-primary/10 pt-6">
        <div className="grid gap-6 sm:grid-cols-2">
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
            <Label className="text-xs font-bold text-primary/60">Category</Label>
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
            <Label className="text-xs font-bold text-primary/60">Doctors</Label>
            <div className="max-h-64 overflow-y-auto rounded-[5px] border border-primary/10">
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
                doctorsData?.data.map((doctor) => (
                  <label
                    key={doctor.id}
                    className="flex cursor-pointer items-center gap-3 border-b border-primary/10 px-3 py-3 last:border-0 hover:bg-primary/5"
                  >
                    <input
                      type="checkbox"
                      checked={form.doctorIds.includes(doctor.id)}
                      onChange={(event) =>
                        toggleDoctor(doctor.id, event.target.checked)
                      }
                      className="size-4 accent-accent"
                    />
                    <span className="text-sm">{doctorName(doctor)}</span>
                    <span className="ml-auto text-xs text-primary/50">
                      {doctor.specialization}
                    </span>
                  </label>
                ))}
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
              className="min-h-32 rounded-[5px] border border-primary/10 bg-background p-3 text-sm outline-none focus:border-accent"
            />
          </div>
        </div>

        {update.error && (
          <p className="mt-4 text-sm text-destructive" role="alert">
            {update.error.message}
          </p>
        )}
        {update.isSuccess && (
          <p className="mt-4 text-sm text-accent">Service updated successfully.</p>
        )}

        <div className="mt-8 flex justify-end border-t border-primary/10 pt-6">
          <Button
            type="submit"
            disabled={update.isPending}
            className="bg-primary text-background"
          >
            <Save className="size-4" />
            {update.isPending ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
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

const PageMessage = ({
  message,
  onBack,
}: {
  message: string;
  onBack: () => void;
}) => (
  <main className="min-h-screen bg-background px-5 py-10 text-primary">
    <button
      type="button"
      onClick={onBack}
      className="flex items-center gap-2 text-xs font-bold text-primary/50 transition-colors hover:text-primary"
    >
      <ArrowLeft className="size-4" />
      Back to services
    </button>
    <p className="mt-10 text-center text-sm text-primary/50">{message}</p>
  </main>
);

export default DashboardService;