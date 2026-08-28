import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header
      className="
        sticky top-0 z-50
        flex h-17.5 w-full items-center justify-between
        border-b border-border
        bg-background/95 px-5
        backdrop-blur-md
        sm:h-20.5 sm:px-[6vw]
      "
    >
      {/* Logo */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="
          inline-flex flex-col
          text-left
          font-serif font-bold
          leading-none text-primary
        "
      >
        <span className="text-xl sm:text-[27px]">
          Medi<span className="text-accent">Care</span>
        </span>

        <span
          className="
            mt-1
            font-sans text-[10px] font-semibold
            uppercase tracking-[0.28em]
            text-accent
            sm:text-xs
          "
        >
          Medical Clinic
        </span>
      </button>

      {/* Navigation */}
      <nav className="flex h-full items-center gap-4 sm:gap-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/appointment">Book an appointment</NavLink>
        <NavLink href="/dashboard">Dashboard</NavLink>
      </nav>

      {/* Auth */}
      <div className="flex h-full items-center gap-2 sm:gap-4">
        <Button
          size="lg"
          variant="ghost"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </Button>

        <span className="text-primary/20">|</span>

        <Button size="lg" onClick={() => navigate("/auth/register")}>
          Register
        </Button>
      </div>
    </header>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(href)}
      className="
        flex h-full items-center
        border-b-[3px] border-transparent px-0.5
        text-[13px] font-bold text-primary
        transition-colors duration-150
        hover:border-accent hover:text-accent
        sm:text-[15px]
      "
    >
      {children}
    </button>
  );
};

export default Navbar;
