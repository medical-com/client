import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerSchema, type RegisterFormValues } from "./types";
import { useAuth, useMe } from "../hooks";

const DAYS = Array.from({ length: 31 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

const MONTHS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) =>
  String(CURRENT_YEAR - i),
);

const dateSelectClassName =
  "h-8 w-full min-w-0 border-b bg-transparent px-2.5 py-1 text-base text-foreground transition-colors outline-none focus:border-b-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-b-destructive md:text-sm dark:bg-input/30";

const Register = () => {
  const navigate = useNavigate();

  const { data: account, isLoading: isLoadingMe } = useMe();
  const { register, isRegistering, registerError } = useAuth();

  const [dob, setDob] = useState({ day: "", month: "", year: "" });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      pesel: "",
      dateOfBirth: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await register(values);
      navigate("/auth/verify-email");
    } catch {
      // registerError already reflects the failure.
    }
  };

  if (!isLoadingMe && account) return <Navigate to="/dashboard" replace />;

  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Create an account</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            A few details and you&apos;re ready to go
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>First name</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="John"
                    autoComplete="given-name"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Last name</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Doe"
                    autoComplete="family-name"
                    aria-invalid={fieldState.invalid}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="pesel"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>PESEL</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  inputMode="numeric"
                  maxLength={11}
                  placeholder="12345678901"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="dateOfBirth"
            control={form.control}
            render={({ field, fieldState }) => {
              const update = (next: Partial<typeof dob>) => {
                const merged = { ...dob, ...next };

                setDob(merged);
                field.onChange(
                  merged.day && merged.month && merged.year
                    ? `${merged.year}-${merged.month}-${merged.day}`
                    : "",
                );
              };

              return (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${field.name}-day`}>
                    Date of birth
                  </FieldLabel>

                  <div className="grid grid-cols-3 gap-2">
                    <select
                      id={`${field.name}-day`}
                      value={dob.day}
                      onChange={(event) =>
                        update({ day: event.target.value })
                      }
                      aria-invalid={fieldState.invalid}
                      className={dateSelectClassName}
                    >
                      <option value="" disabled>
                        Day
                      </option>

                      {DAYS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>

                    <select
                      value={dob.month}
                      onChange={(event) =>
                        update({ month: event.target.value })
                      }
                      aria-invalid={fieldState.invalid}
                      className={dateSelectClassName}
                    >
                      <option value="" disabled>
                        Month
                      </option>

                      {MONTHS.map((m) => (
                        <option key={m.value} value={m.value}>
                          {m.label}
                        </option>
                      ))}
                    </select>

                    <select
                      value={dob.year}
                      onChange={(event) =>
                        update({ year: event.target.value })
                      }
                      aria-invalid={fieldState.invalid}
                      className={dateSelectClassName}
                    >
                      <option value="" disabled>
                        Year
                      </option>

                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />

          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  autoComplete="tel"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {registerError && (
            <p className="text-sm text-destructive">{registerError.message}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isRegistering || form.formState.isSubmitting}
          >
            {isRegistering ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
