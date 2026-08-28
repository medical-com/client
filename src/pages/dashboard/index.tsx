import { CalendarDays, Users } from "lucide-react";

import { QuickAction } from "@/pages/dashboard/components/quick-action";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-360 px-5 py-10 sm:px-8 lg:px-10">
        {/* Heading */}
        <section className="mb-10">
          <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
            RECEPTION DESK
          </p>

          <h1 className="font-serif text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-5xl">
            Good morning, Jane.
          </h1>
        </section>

        {/* Bottom section */}
        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Quick actions */}
          <div className="border-t border-primary/10 pt-6">
            <p className="mb-4 text-xs font-extrabold tracking-[0.2em] text-accent">
              QUICK ACTIONS
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <QuickAction
                icon={<CalendarDays className="size-5" />}
                title="New appointment"
                description="Schedule a patient visit"
              />

              <QuickAction
                icon={<Users className="size-5" />}
                title="Find patient"
                description="Search patient records"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
