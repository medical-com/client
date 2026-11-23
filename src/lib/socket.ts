import { io } from "socket.io-client";

export const socket = io({
  withCredentials: true,
  autoConnect: false,
});

export type AppointmentStatusChangedPayload = {
  appointmentId: string;
  status: string;
};
