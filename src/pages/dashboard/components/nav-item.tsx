import { useNavigate } from "react-router-dom";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

export const NavItem = ({ icon, label, href }: NavItemProps) => {
  const navigate = useNavigate();
  const active = window.location.pathname === href;
  return (
    <button
      onClick={() => navigate(href)}
      type="button"
      className={`
        flex w-full items-center gap-3 rounded-[5px] px-3 py-2.5
        text-sm font-semibold transition-colors
        ${
          active
            ? "bg-primary text-background"
            : "text-primary/65 hover:bg-primary/5 hover:text-primary"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
};
