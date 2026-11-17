import { CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-360 px-5 py-10 sm:px-8 lg:px-10">
        <section className="mb-10">
          <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
            DOCTOR DASHBOARD
          </p>

          <h1 className="font-serif text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
            Welcome to your dashboard.
          </h1>

          <p className="mt-4 max-w-2xl font-serif text-lg text-primary/60">
            Review your schedule, manage patient visits, and complete
            appointments from one place.
          </p>
        </section>

        <section className="mt-10 border-t border-primary/10 pt-6">
          <p className="mb-4 text-xs font-extrabold tracking-[0.2em] text-accent">
            QUICK ACTIONS
          </p>

          <Link
            to="/dashboard/doctor/appointments"
            className="group flex max-w-md items-center gap-4 rounded-[5px] border border-primary/10 p-5 text-left transition-colors hover:bg-primary hover:text-background"
          >
            <CalendarCheck className="size-5 text-accent" />
            <span>
              <span className="block font-semibold">My appointments</span>
              <span className="mt-1 block text-xs text-primary/50 group-hover:text-background/60">
                Open your weekly calendar
              </span>
            </span>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;
