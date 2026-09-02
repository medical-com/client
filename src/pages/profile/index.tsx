import { useNavigate } from "react-router-dom";

import { useAuth, useMe } from "@/pages/auth/hooks";
import { hasPermission } from "@/lib/utils";
import { AccountPermission } from "@/types/account.type";

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

  const initials = account.email.slice(0, 2).toUpperCase();
  const roleLabel =
    account.group.charAt(0).toUpperCase() + account.group.slice(1);

  const handleSignOut = async () => {
    await logout();
    navigate("/auth/login");
  };

  return (
    <div className="bg-background text-primary">
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-360 px-5 pt-20 pb-16 sm:px-[6vw] lg:pt-28">
          <p className="mb-5 text-xs font-extrabold tracking-[0.22em] text-accent">
            ACCOUNT
          </p>

          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h1
              className="
                max-w-3xl font-serif text-5xl font-bold
                leading-[0.98] tracking-[-0.04em]
                sm:text-6xl lg:text-[82px]
              "
            >
              Your account,
              <br />
              <em className="font-normal text-accent">at a glance.</em>
            </h1>

            <div className="flex items-center gap-5">
              <div
                className="
                  flex size-20 shrink-0 items-center justify-center
                  bg-primary font-serif text-2xl font-bold text-background
                  sm:size-24 sm:text-3xl
                "
              >
                {initials}
              </div>

              <div>
                <p className="font-serif text-xl font-bold sm:text-2xl">
                  {account.email}
                </p>

                <p className="mt-1 text-sm text-primary/50">{roleLabel}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Details */}
        <section className="border-y border-primary/10">
          <div
            className="
              mx-auto grid max-w-360 gap-10
              px-5 py-16 sm:px-[6vw]
              sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:py-20
            "
          >
            <div>
              <p className="text-xs font-extrabold tracking-[0.2em] text-primary/40">
                EMAIL
              </p>

              <p className="mt-3 wrap-break-word font-serif text-2xl font-bold">
                {account.email}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold tracking-[0.2em] text-primary/40">
                ROLE
              </p>

              <p className="mt-3 font-serif text-2xl font-bold">{roleLabel}</p>
            </div>

            <div>
              <p className="text-xs font-extrabold tracking-[0.2em] text-primary/40">
                EMAIL VERIFICATION
              </p>

              <p
                className={`
                  mt-3 font-serif text-2xl font-bold
                  ${account.emailVerified ? "text-accent" : "text-primary/40"}
                `}
              >
                {account.emailVerified ? "Verified" : "Not verified"}
              </p>
            </div>

            <div>
              <p className="text-xs font-extrabold tracking-[0.2em] text-primary/40">
                MEMBER SINCE
              </p>

              <p className="mt-3 font-serif text-2xl font-bold">
                {formatDate(account.createdAt)}
              </p>
            </div>
          </div>
        </section>

        {/* Dashboard button */}
        {hasPermission(account, AccountPermission.ACCESS_DASHBOARD) && (
          <section className="mx-auto max-w-360 px-5 py-16 sm:px-[6vw] lg:py-20">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="
              bg-primary px-6 py-4
              font-bold text-background
              shadow-[5px_5px_0_var(--color-highlight)]
              transition-all duration-150
              hover:translate-x-0.5 hover:translate-y-0.5
              hover:shadow-[3px_3px_0_var(--color-highlight)]
            "
            >
              Go to Dashboard
            </button>
          </section>
        )}

        {/* Sign out */}
        <section className="mx-auto max-w-360 px-5 py-16 sm:px-[6vw] lg:py-20">
          <p className="mb-6 max-w-xl font-serif text-lg leading-[1.7] text-primary/65">
            Signing out will end your current session on this device.
          </p>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="
              bg-primary px-6 py-4
              font-bold text-background
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
