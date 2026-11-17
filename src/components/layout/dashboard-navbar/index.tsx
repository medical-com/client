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
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useNaviagtionList } from "./useNaviagtionList";

type DashboardNavbarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export const DashboardNavbar = ({
  collapsed,
  onToggle,
}: DashboardNavbarProps) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 hidden shrink-0 border-r border-primary/10 bg-background lg:flex lg:flex-col ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo */}
        <div
          className={`flex h-20 items-center ${collapsed ? "justify-center" : "px-7"}`}
        >
          {collapsed ? (
            <span className="font-serif text-xl font-bold">M</span>
          ) : (
            <Logo />
          )}
        </div>

        <Separator className="bg-primary/10" />

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <Navigation collapsed={collapsed} onToggle={onToggle} />
        </nav>

        {/* Back */}
        <div>
          <NavLink
            to="/"
            className={`flex w-full items-center rounded-[5px] px-3 py-2.5 text-sm font-semibold transition-colors text-primary/65 hover:bg-primary/5 hover:text-primary ${
              collapsed ? "justify-center" : "gap-3"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
            {!collapsed && "Back to main site"}
          </NavLink>
        </div>

      </aside>

      {/* Mobile / top navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-40 flex h-20 items-center justify-between border-b border-primary/10 bg-background px-5 sm:px-8 lg:px-10 ${
          collapsed ? "lg:left-20" : "lg:left-64"
        }`}
      >
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
              <Navigation collapsed={false} />
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

const Navigation = ({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle?: () => void;
}) => {
  const navigation = useNaviagtionList();

  return (
    <div>
      <div
        className={`mb-3 flex items-center ${
          collapsed ? "justify-center" : "justify-between px-3"
        }`}
      >
        {!collapsed && (
          <p className="text-[10px] font-extrabold tracking-[0.2em] text-primary/40">
            WORKSPACE
          </p>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center rounded-[5px] p-2 text-primary/60 hover:bg-primary/5 hover:text-primary"
          aria-label={
            collapsed
              ? "Expand dashboard navigation"
              : "Collapse dashboard navigation"
          }
          title={collapsed ? "Expand navigation" : "Collapse navigation"}
        >
          {collapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </button>
      </div>

      <div className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={true}
              className={({ isActive }) =>
                `
                flex w-full items-center
                rounded-[5px] px-3 py-2.5
                text-sm font-semibold
                transition-colors
                ${collapsed ? "justify-center" : "gap-3"} ${
                  isActive
                    ? "bg-primary text-background"
                    : "text-primary/65 hover:bg-primary/5 hover:text-primary"
                }
              `
              }
            >
              <Icon className="size-4" />
              {!collapsed && item.label}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
