import { useNavigate } from "react-router-dom";

import { useAuth, useMe } from "@/pages/auth/hooks";
import { AccountRole } from "@/types/account.type";
import { hasPermission } from "@/lib/utils";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Profile = () => {
  const navigate = useNavigate();
  const { data: account } = useMe();
  const { logout, isLoggingOut } = useAuth();

  if (!account) return null;

  const initials =
    `${account.firstName.charAt(0)}${account.lastName.charAt(0)}`.toUpperCase();
  const roleLabel =
    account.role.charAt(0).toUpperCase() + account.role.slice(1);

  const handleSignOut = async () => {
    await logout();
    navigate("/auth/login");
  };

  const fields = [
    { label: "FIRST NAME", value: account.firstName },
    { label: "LAST NAME", value: account.lastName },
    { label: "EMAIL", value: account.email },
    { label: "PHONE", value: account.phone },
    { label: "DATE OF BIRTH", value: formatDate(account.dateOfBirth) },
    { label: "PESEL", value: account.pesel },
    { label: "ROLE", value: roleLabel },
    {
      label: "EMAIL VERIFICATION",
      value: account.emailVerified ? "Verified" : "Not verified",
      accent: account.emailVerified,
    },
    { label: "MEMBER SINCE", value: formatDate(account.createdAt) },
    { label: "ACCOUNT ID", value: account.id, mono: true },
  ];

  return (
    <div className="bg-background text-primary">
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-360 px-5 pt-14 pb-10 sm:px-[6vw] lg:pt-16">
          <p className="mb-3 text-xs font-extrabold tracking-[0.22em] text-accent">
            ACCOUNT
          </p>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-serif text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
              Your account
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center bg-primary font-serif text-sm font-bold text-background">
                {initials}
              </div>

              <div>
                <p className="font-serif text-sm font-bold sm:text-base">
                  {account.firstName} {account.lastName}
                </p>

                <p className="mt-0.5 text-xs text-primary/50">{roleLabel}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="border-y border-primary/10">
          <div
            className="
              mx-auto grid max-w-360 gap-x-8 gap-y-6
              px-5 py-10 sm:px-[6vw]
              sm:grid-cols-2 lg:grid-cols-3
            "
          >
            {fields.map((field) => (
              <div key={field.label}>
                <p className="text-[10px] font-extrabold tracking-[0.18em] text-primary/40">
                  {field.label}
                </p>

                <p
                  className={`
                    mt-1.5 wrap-break-word text-sm font-semibold
                    ${field.mono ? "font-mono text-xs" : ""}
                    ${field.accent === false ? "text-primary/40" : ""}
                    ${field.accent === true ? "text-accent" : ""}
                  `}
                >
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Dashboard button */}
        <section className="mx-auto max-w-360 md:flex">
          {hasPermission(account.role as AccountRole, [AccountRole.ADMIN]) && (
            <div className="py-10 sm:px-[6vw]">
              <button
                type="button"
                onClick={() => navigate("/dashboard/admin")}
                className="
                bg-primary px-5 py-3
                text-sm font-bold text-background
                shadow-[5px_5px_0_var(--color-highlight)]
                transition-all duration-150
                hover:translate-x-0.5 hover:translate-y-0.5
                hover:shadow-[3px_3px_0_var(--color-highlight)]
              "
              >
                Go to Admin Dashboard
              </button>
            </div>
          )}

          {hasPermission(account.role as AccountRole, [
            AccountRole.RECEPTIONIST,
          ]) && (
            <div className="py-10 sm:px-[6vw]">
              <button
                type="button"
                onClick={() => navigate("/dashboard/receptionist")}
                className="
                bg-primary px-5 py-3
                text-sm font-bold text-background
                shadow-[5px_5px_0_var(--color-highlight)]
                transition-all duration-150
                hover:translate-x-0.5 hover:translate-y-0.5
                hover:shadow-[3px_3px_0_var(--color-highlight)]
              "
              >
                Go to Receptionist Dashboard
              </button>
            </div>
          )}

          {hasPermission(account.role as AccountRole, [AccountRole.DOCTOR]) && (
            <div className="py-10 sm:px-[6vw]">
              <button
                type="button"
                onClick={() => navigate("/dashboard/doctor")}
                className="
                bg-primary px-5 py-3
                text-sm font-bold text-background
                shadow-[5px_5px_0_var(--color-highlight)]
                transition-all duration-150
                hover:translate-x-0.5 hover:translate-y-0.5
                hover:shadow-[3px_3px_0_var(--color-highlight)]
              "
              >
                Go to Doctor Dashboard
              </button>
            </div>
          )}
        </section>

        {/* Sign out */}
        <section className="mx-auto max-w-360 px-5 py-10 sm:px-[6vw]">
          <p className="mb-4 max-w-xl text-sm leading-6 text-primary/65">
            Signing out will end your current session on this device.
          </p>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="
              bg-primary px-5 py-3
              text-sm font-bold text-background
              shadow-[5px_5px_0_var(--color-highlight)]
              transition-all duration-150
              hover:translate-x-0.5 hover:translate-y-0.5
              hover:shadow-[3px_3px_0_var(--color-highlight)]
              disabled:pointer-events-none disabled:opacity-50
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-accent
            "
          >
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </button>
        </section>
      </main>
    </div>
  );
};

export default Profile;
