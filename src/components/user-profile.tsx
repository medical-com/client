import { useMe, useAuth } from "@/pages/auth/hooks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, Users, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export const UserProfile = () => {
  const navigate = useNavigate();
  const { data: account } = useMe();
  const { logout, isLoggingOut } = useAuth();

  const handleSignOut = async () => {
    await logout();
    navigate("/auth/login");
  };

  const initials = account
    ? `${account.firstName.charAt(0)}${account.lastName.charAt(0)}`.toUpperCase()
    : "··";
  const roleLabel = account
    ? account.role.charAt(0).toUpperCase() + account.role.slice(1)
    : "";

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
        <Avatar className="size-9">
          <AvatarFallback className=" bg-primary text-xs font-bold text-background">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="hidden min-w-0 text-left sm:block">
          <p className="truncate text-sm font-bold">
            {account ? `${account.firstName} ${account.lastName}` : ""}
          </p>
          <p className="truncate text-xs text-primary/50">{roleLabel}</p>
        </div>

        <ChevronDown className="hidden size-4 text-primary/50 sm:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 rounded-[5px]">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <Users className="mr-2 size-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 size-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut} disabled={isLoggingOut}>
          <LogOut className="mr-2 size-4" />
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
