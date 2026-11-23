import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { socket, type AppointmentStatusChangedPayload } from "@/lib/socket";

export const AppointmentSocketListener = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleStatusChanged = ({
      appointmentId,
    }: AppointmentStatusChangedPayload) => {
      void queryClient.invalidateQueries({
        queryKey: ["dashboard", "appointment", "find-one", appointmentId],
      });
      void queryClient.invalidateQueries({
        queryKey: ["dashboard", "appointment", "list"],
      });
    };

    socket.connect();
    socket.on("appointment:statusChanged", handleStatusChanged);

    return () => {
      socket.off("appointment:statusChanged", handleStatusChanged);
      socket.disconnect();
    };
  }, [queryClient]);

  return null;
};
