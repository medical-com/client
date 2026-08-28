import { z } from "zod";

export const settingsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  role: z.string().min(2, "Please enter your role."),
  email: z.string().email("Please enter a valid e-mail address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  clinicName: z.string().min(2, "Please enter the clinic name."),
  clinicAddress: z.string().min(5, "Please enter the clinic address."),
  clinicPhone: z.string().min(7, "Please enter a valid phone number."),
  clinicEmail: z.string().email("Please enter a valid e-mail address."),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;

export type NotificationPreference = {
  id: string;
  label: string;
  description: string;
};

export type ToggleRowProps = {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
};

export type SectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};
