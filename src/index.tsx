import { Suspense, useState } from "react";
import { BrowserRouter, useLocation, useRoutes } from "react-router-dom";

import { Navbar } from "@/components/layout/navbar";
import { DashboardNavbar } from "@/components/layout/dashboard-navbar";
import { Footer } from "@/components/layout/footer";
import { RequireAuth } from "@/components/auth/require-auth";

import Home from "@/pages/home";
import About from "@/pages/about";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import VerifyEmail from "@/pages/auth/verify-email";
import ConfirmDoctorInvitation from "@/pages/auth/confirm-doctor";
import ForgotPassword from "@/pages/auth/forgot-password";
import ResetPassword from "@/pages/auth/reset-password";
import Appointment from "@/pages/appointment";
import Profile from "@/pages/profile";

// Dashboard admin pages
import AdminDashboard from "@/pages/dashboard/admin";
import DashboardAppointments from "@/pages/dashboard/receptionist/appointment/pages/list";
import DashboardAppointment from "@/pages/dashboard/receptionist/appointment/pages/detail";
import DashboardPatients from "@/pages/dashboard/admin/patient/pages/list";
import DashboardPatient from "@/pages/dashboard/admin/patient/pages/detail";
import DashboardDoctor from "@/pages/dashboard/admin/doctor/pages/detail";
import DashboardDoctors from "@/pages/dashboard/admin/doctor/pages/list";
import DashboardAddDoctor from "@/pages/dashboard/admin/doctor/pages/add";
import DashboardServices from "@/pages/dashboard/admin/service/pages/list";
import DashboardService from "@/pages/dashboard/admin/service/pages/detail";

// Dashboard receptionist pages
import ReceptionistDashboard from "@/pages/dashboard/receptionist";
import ReceptionistCreateAppointment from "@/pages/dashboard/receptionist/appointment/pages/create";
import DashboardAppointmentDay from "@/pages/dashboard/receptionist/appointment/pages/day";
import { AccountRole } from "./types/account.type";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "verify-email",
          element: <VerifyEmail />,
        },
        {
          path: "confirm-doctor",
          element: <ConfirmDoctorInvitation />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/appointment",
      element: <Appointment />,
    },
    {
      path: "/profile",
      element: <RequireAuth />,

      children: [
        {
          path: "",
          element: <Profile />,
        },
      ],
    },

    //Dashboard routes
    {
      path: "/dashboard/admin",
      element: <RequireAuth roles={[AccountRole.ADMIN]} />,

      children: [
        {
          path: "",
          element: <AdminDashboard />,
        },
        {
          path: "appointments",
          element: <DashboardAppointments />,
        },
        {
          path: "appointments/day",
          element: <DashboardAppointmentDay />,
        },

        {
          path: "appointment/:id",
          element: <DashboardAppointment />,
        },
        {
          path: "patients",
          element: <DashboardPatients />,
        },
        {
          path: "patient/:id",
          element: <DashboardPatient />,
        },
        {
          path: "doctors",
          element: <DashboardDoctors />,
        },
        {
          path: "doctor/:id",
          element: <DashboardDoctor />,
        },
        {
          path: "doctor/add",
          element: <DashboardAddDoctor />,
        },
        {
          path: "services",
          element: <DashboardServices />,
        },
        {
          path: "service/:id",
          element: <DashboardService />,
        },
      ],
    },

    {
      path: "/dashboard/receptionist",
      element: <RequireAuth roles={[AccountRole.RECEPTIONIST]} />,

      children: [
        {
          path: "",
          element: <ReceptionistDashboard />,
        },
        {
          path: "appointments/create",
          element: <ReceptionistCreateAppointment />,
        },
        {
          path: "appointments",
          element: <DashboardAppointments />,
        },
        {
          path: "appointments/day",
          element: <DashboardAppointmentDay />,
        },
        {
          path: "appointment/:id",
          element: <DashboardAppointment />,
        },
      ],
    },
  ]);

  return routes;
};

const AppLayout = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return window.localStorage.getItem("dashboard-sidebar-collapsed") === "true";
  });

  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-background">
      {!isDashboardRoute ? (
        <Navbar />
      ) : (
        <DashboardNavbar
          collapsed={sidebarCollapsed}
          onToggle={() => {
            setSidebarCollapsed((collapsed) => {
              const next = !collapsed;
              window.localStorage.setItem(
                "dashboard-sidebar-collapsed",
                String(next),
              );
              return next;
            });
          }}
        />
      )}

      <div
        className={
          isDashboardRoute
            ? sidebarCollapsed
              ? "pt-20 lg:ml-20"
              : "pt-20 lg:ml-64"
            : ""
        }
      >
        <Suspense fallback={<div>Loading...</div>}>
          <AppRoutes />
        </Suspense>
      </div>

      {!isDashboardRoute && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
