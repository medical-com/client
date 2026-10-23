import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { verifyEmailSchema, type VerifyEmailFormValues } from "./types";
import { useAuth } from "../hooks";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const { confirmEmail, isConfirmingEmail, confirmEmailError } = useAuth();

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      token: "",
    },
  });

  const onSubmit = async (values: VerifyEmailFormValues) => {
    try {
      await confirmEmail(values);
      navigate("/auth/login", { state: { verified: true } });
    } catch {
      // confirmEmailError already reflects the failure.
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Verify your email</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter the 6-digit code we emailed you to activate your account.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="token"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Verification code</FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  inputMode="numeric"
                  maxLength={6}
                  autoComplete="one-time-code"
                  placeholder="123456"
                  className="text-center text-lg tracking-[0.5em]"
                  aria-invalid={fieldState.invalid}
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {confirmEmailError && (
            <p className="text-sm text-destructive">
              {confirmEmailError.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isConfirmingEmail || form.formState.isSubmitting}
          >
            {isConfirmingEmail ? "Verifying..." : "Verify email"}
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

export default VerifyEmail;
