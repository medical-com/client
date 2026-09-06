import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "./types";
import { useAuth } from "../hooks";

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);

  const { forgotPassword, isSendingResetLink, forgotPasswordError } =
    useAuth();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      await forgotPassword(values);
      setSent(true);
    } catch {
      // forgotPasswordError already reflects the failure.
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold">Forgot password</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a link to reset it.
          </p>
        </div>

        {sent ? (
          <p className="rounded-md bg-accent/10 px-3 py-2 text-center text-sm text-accent">
            Check your email for a link to reset your password.
          </p>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

            {forgotPasswordError && (
              <p className="text-sm text-destructive">
                {forgotPasswordError.message}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSendingResetLink || form.formState.isSubmitting}
            >
              {isSendingResetLink ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        )}

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

export default ForgotPassword;
