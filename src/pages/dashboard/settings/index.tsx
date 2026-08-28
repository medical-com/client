import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ProfileCard } from "./components/profile-card";
import { Section } from "./components/section";
import { defaultSettingsValues } from "./constants";
import { settingsSchema, type SettingsFormValues } from "./types";

const DashboardSettings = () => {
  const [saved, setSaved] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    mode: "onTouched",
    defaultValues: defaultSettingsValues,
  });

  const fullName = useWatch({ control: form.control, name: "fullName" });
  const role = useWatch({ control: form.control, name: "role" });

  const onSubmit = async (data: SettingsFormValues) => {
    console.log("Settings:", { ...data });

    // Replace this with your API request.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-360 px-5 py-10 sm:px-8 lg:px-10">
        {/* Header */}
        <section className="mb-10">
          <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
            ACCOUNT
          </p>

          <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            Settings
          </h1>

          <p className="mt-3 font-serif text-lg text-primary/60">
            Manage your profile, clinic details, and notification preferences.
          </p>
        </section>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-3xl space-y-10"
        >
          <Section
            title="PROFILE"
            description="Your personal information and role at the clinic."
          >
            <ProfileCard name={fullName} role={role} />

            <div className="grid gap-6 sm:grid-cols-2">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Full name</FieldLabel>

                    <Input
                      {...field}
                      autoComplete="name"
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Role</FieldLabel>

                    <Input {...field} aria-invalid={fieldState.invalid} />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>E-mail</FieldLabel>

                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Phone number</FieldLabel>

                    <Input
                      {...field}
                      type="tel"
                      autoComplete="tel"
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>
          </Section>

          <Section
            title="CLINIC INFORMATION"
            description="Details shown to patients when booking an appointment."
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Controller
                name="clinicName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Clinic name</FieldLabel>

                    <Input {...field} aria-invalid={fieldState.invalid} />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="clinicPhone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Clinic phone</FieldLabel>

                    <Input
                      {...field}
                      type="tel"
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="clinicEmail"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Clinic e-mail</FieldLabel>

                    <Input
                      {...field}
                      type="email"
                      aria-invalid={fieldState.invalid}
                    />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />

              <Controller
                name="clinicAddress"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Clinic address</FieldLabel>

                    <Input {...field} aria-invalid={fieldState.invalid} />

                    <FieldError errors={[fieldState.error]} />
                  </Field>
                )}
              />
            </div>
          </Section>

          <div className="flex items-center justify-end gap-4 border-t border-primary/10 pt-8">
            {saved && (
              <p className="text-sm font-semibold text-accent">
                Settings saved.
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="
                rounded-[5px]
                shadow-[5px_5px_0_var(--color-highlight)]
                transition-all duration-150
                hover:translate-x-0.5
                hover:translate-y-0.5
                hover:shadow-[3px_3px_0_var(--color-highlight)]
              "
            >
              {form.formState.isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default DashboardSettings;
