import {
  CalendarDays,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { NavLink } from "react-router-dom";

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

/* -------------------------------------------------------------------------- */
/* Profile                                                                    */
/* -------------------------------------------------------------------------- */

const UserProfile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
          flex h-auto items-center gap-3
          rounded-[5px] px-2 py-2
          transition-colors
          hover:bg-primary/5
        "
      >
        <Avatar className="size-9 rounded-[5px]">
          <AvatarFallback className="rounded-[5px] bg-primary text-xs font-bold text-background">
            JD
          </AvatarFallback>
        </Avatar>

        <div className="hidden min-w-0 text-left sm:block">
          <p className="truncate text-sm font-bold">Jane Doe</p>
          <p className="truncate text-xs text-primary/50">Receptionist</p>
        </div>

        <ChevronDown className="hidden size-4 text-primary/50 sm:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 rounded-[5px]">
        <DropdownMenuItem>
          <Users className="mr-2 size-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 size-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
