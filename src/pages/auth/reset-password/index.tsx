import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema, type ResetPasswordFormValues } from "./types";
import { useAuth } from "../hooks";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { resetPassword, isResettingPassword, resetPasswordError } =
    useAuth();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) return;

    try {
      await resetPassword({ token, password: values.password });
      navigate("/auth/login", { state: { passwordReset: true } });
    } catch {
      // resetPasswordError already reflects the failure.
    }
  };

  if (!token) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-3xl font-semibold">Invalid reset link</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            This password reset link is missing or invalid. Request a new
            one below.
          </p>

          <Link
            to="/auth/forgot-password"
            className="mt-6 inline-block font-medium text-primary underline-offset-4 hover:underline"
          >
            Request a new link
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Choose a new password</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter a new password for your account.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>New password</FieldLabel>

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

          {resetPasswordError && (
            <p className="text-sm text-destructive">
              {resetPasswordError.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isResettingPassword || form.formState.isSubmitting}
          >
            {isResettingPassword ? "Resetting..." : "Reset password"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link
            to="/auth/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Back to login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;
