import { z } from "zod";

export enum AppointmentStep {
  PersonalInformation = 0,
  ServiceSelection = 1,
  DateSelection = 2,
  AdditionalInformation = 3,
}

export const appointmentSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  secondName: z.string().min(2, "Second name must be at least 2 characters."),
  address: z.string().min(5, "Please enter your address."),
  dateOfBirth: z.string().min(1, "Please enter your date of birth."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid e-mail address."),
  service: z.string().min(1, "Please select a service."),
  doctor: z.string().min(1, "Please select a doctor."),
  date: z.string().min(1, "Please select a date."),
  time: z.string().min(1, "Please select a time."),
  additionalInfo: z
    .string()
    .max(500, "Additional information must be less than 500 characters.")
    .optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
