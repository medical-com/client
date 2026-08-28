import type { NotificationPreference, SettingsFormValues } from "./types";

// Temporary data.
// Later this will come from your API.
export const defaultSettingsValues: SettingsFormValues = {
  fullName: "Jane Doe",
  role: "Receptionist",
  email: "jane.doe@meridianclinic.com",
  phone: "+1 (555) 234-5678",
  clinicName: "Meridian Medical Clinic",
  clinicAddress: "482 Maple Street, Springfield",
  clinicPhone: "+1 (555) 100-2000",
  clinicEmail: "contact@meridianclinic.com",
};

export const notificationPreferences: NotificationPreference[] = [
  {
    id: "email-reminders",
    label: "Email reminders",
    description: "Get notified by email about upcoming appointments.",
  },
  {
    id: "sms-reminders",
    label: "SMS reminders",
    description: "Send text message reminders to patients.",
  },
  {
    id: "new-bookings",
    label: "New booking alerts",
    description: "Receive an alert whenever a new appointment is booked.",
  },
  {
    id: "daily-summary",
    label: "Daily summary",
    description: "Receive a daily summary of the clinic schedule.",
  },
];
