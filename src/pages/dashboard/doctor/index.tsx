import { CalendarCheck, UserRoundSearch } from "lucide-react";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-280 px-5 py-10 sm:px-8 lg:px-10">
        <section className="border-b border-primary/10 pb-9">
          <p className="mb-3 text-xs font-extrabold tracking-[0.22em] text-accent">
            DOCTOR DASHBOARD
          </p>

          <h1 className="font-serif text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
            Good day, Doctor.
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-primary/55">
            Review today's visits or open a patient record.
          </p>
        </section>

        <section className="pt-7">
          <p className="mb-2 text-xs font-extrabold tracking-[0.2em] text-primary/40">
            WORKSPACE
          </p>

          <div>
            <Link
              to="/dashboard/doctor/appointments"
              className="group flex items-center justify-between border-b border-primary/10 py-5"
            >
              <span className="flex items-center gap-3">
                <CalendarCheck className="size-5 text-accent" />
                <span className="font-serif text-xl font-bold">My appointments</span>
              </span>
              <span className="text-xs font-bold text-primary/40 transition-transform group-hover:translate-x-1 group-hover:text-primary">
                Open
              </span>
            </Link>
            <Link
              to="/dashboard/doctor/patients"
              className="group flex items-center justify-between border-b border-primary/10 py-5"
            >
              <span className="flex items-center gap-3">
                <UserRoundSearch className="size-5 text-accent" />
                <span className="font-serif text-xl font-bold">Patient records</span>
              </span>
              <span className="text-xs font-bold text-primary/40 transition-transform group-hover:translate-x-1 group-hover:text-primary">
                Open
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;
