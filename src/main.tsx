import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./index.tsx";

import "./index.css";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { AppointmentSocketListener } from "@/components/appointment-socket-listener";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.skipGlobalError) return;
      toast.error(error.message);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(error.message);
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppointmentSocketListener />
      <App />
      <Toaster position="bottom-right" />
    </QueryClientProvider>
  </StrictMode>,
);
