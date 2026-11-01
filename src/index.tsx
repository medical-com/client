import { Suspense } from "react";
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

// Dashboard pages
import Dashboard from "@/pages/dashboard";
import DashboardAppointments from "@/pages/dashboard/appointment/pages/list";
import DashboardAppointment from "@/pages/dashboard/appointment/pages/detail";
import DashboardPatients from "@/pages/dashboard/patient/pages/list";
import DashboardPatient from "@/pages/dashboard/patient/pages/detail";
import DashboardDoctor from "@/pages/dashboard/doctor/pages/detail";
import DashboardDoctors from "@/pages/dashboard/doctor/pages/list";
import DashboardAddDoctor from "@/pages/dashboard/doctor/pages/add";
import DashboardSettings from "@/pages/dashboard/settings";
import DashboardServices from "@/pages/dashboard/service/pages/list";
import DashboardService from "@/pages/dashboard/service/pages/detail";

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
    {
      path: "/dashboard",
      element: <RequireAuth />,

      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "appointments",
          element: <DashboardAppointments />,
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
          path: "settings",
          element: <DashboardSettings />,
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
  ]);

  return routes;
};

const AppLayout = () => {
  const location = useLocation();

  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-background">
      {!isDashboardRoute ? <Navbar /> : <DashboardNavbar />}

      <div className={isDashboardRoute ? "pt-20 lg:ml-64" : ""}>
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
