import {
  CalendarDays,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { NavLink } from "react-router-dom";
import { UserProfile } from "@/components/user-profile";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Appointments",
    href: "/dashboard/appointments",
    icon: CalendarDays,
  },
  {
    label: "Patients",
    href: "/dashboard/patients",
    icon: Users,
  },
];

export const DashboardNavbar = () => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 shrink-0 border-r border-primary/10 bg-background lg:flex lg:flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center px-7">
          <Logo />
        </div>

        <Separator className="bg-primary/10" />

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <Navigation />
        </nav>

        {/* Profile */}
        <div className="border-t border-primary/10 p-4">
          <UserProfile />
        </div>
      </aside>

      {/* Mobile / top navigation */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-20 items-center justify-between border-b border-primary/10 bg-background px-5 sm:px-8 lg:left-64 lg:px-10">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            className="
              flex size-10 items-center justify-center
              rounded-[5px]
              transition-colors
              hover:bg-primary/5
              lg:hidden
            "
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-72 border-r border-primary/10 bg-background p-0"
          >
            <SheetHeader className="h-20 justify-center border-b border-primary/10 px-7">
              <SheetTitle className="text-left">
                <Logo />
              </SheetTitle>
            </SheetHeader>

            <nav className="px-4 py-6">
              <Navigation />
            </nav>

            <div className="absolute inset-x-0 bottom-0 border-t border-primary/10 p-4">
              <UserProfile />
            </div>
          </SheetContent>
        </Sheet>

        {/* Date */}
        <div className="flex-1 lg:flex-none">
          <p className="text-center text-xs font-extrabold tracking-[0.18em] text-accent lg:text-left">
            THURSDAY · AUGUST 27
          </p>
        </div>

        {/* Profile */}
        <UserProfile />
      </header>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Logo                                                                       */
/* -------------------------------------------------------------------------- */

const Logo = () => {
  return (
    <div>
      <p className="font-serif text-xl font-bold tracking-[-0.02em]">
        Meridian
      </p>

      <p className="text-[10px] font-extrabold tracking-[0.2em] text-accent">
        MEDICAL CLINIC
      </p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

const Navigation = () => {
  return (
    <div>
      <p className="mb-3 px-3 text-[10px] font-extrabold tracking-[0.2em] text-primary/40">
        WORKSPACE
      </p>

      <div className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/dashboard"}
              className={({ isActive }) =>
                `
                flex w-full items-center gap-3
                rounded-[5px] px-3 py-2.5
                text-sm font-semibold
                transition-colors
                ${
                  isActive
                    ? "bg-primary text-background"
                    : "text-primary/65 hover:bg-primary/5 hover:text-primary"
                }
              `
              }
            >
              <Icon className="size-4" />
              {item.label}
            </NavLink>
          );
        })}
      </div>

      <p className="mb-3 mt-10 px-3 text-[10px] font-extrabold tracking-[0.2em] text-primary/40">
        MANAGEMENT
      </p>

      <NavLink
        to="/dashboard/settings"
        className={({ isActive }) =>
          `
          flex w-full items-center gap-3
          rounded-[5px] px-3 py-2.5
          text-sm font-semibold
          transition-colors
          ${
            isActive
              ? "bg-primary text-background"
              : "text-primary/65 hover:bg-primary/5 hover:text-primary"
          }
        `
        }
      >
        <Settings className="size-4" />
        Settings
      </NavLink>
    </div>
  );
};
