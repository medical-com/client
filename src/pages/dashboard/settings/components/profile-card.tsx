import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const ProfileCard = ({ name, role }: { name: string; role: string }) => {
  return (
    <div className="mb-8 flex items-center gap-5">
      <Avatar className="size-16 rounded-[5px]">
        <AvatarFallback className="rounded-[5px] bg-primary text-lg font-bold text-background">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>

      <div>
        <p className="font-serif text-lg font-bold">{name}</p>
        <p className="text-sm text-primary/50">{role}</p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-3 rounded-[5px] border-primary/10"
        >
          Change photo
        </Button>
      </div>
    </div>
  );
};
