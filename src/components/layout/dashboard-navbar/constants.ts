import {
  LayoutDashboard,
  Stethoscope,
  Users,
  BriefcaseMedical,
} from "lucide-react";

export const ADMIN_NAVIGATION = [
  {
    label: "Dashboard",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Patients",
    href: "/dashboard/admin/patients",
    icon: Users,
  },
  {
    label: "Doctors",
    href: "/dashboard/admin/doctors",
    icon: Stethoscope,
  },
  {
    label: "Services",
    href: "/dashboard/admin/services",
    icon: BriefcaseMedical,
  },
];

export const RECEPTIONIST_NAVIGATION = [
  {
    label: "Dashboard",
    href: "/dashboard/receptionist",
    icon: LayoutDashboard,
  },
];
