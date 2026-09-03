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
import Appointment from "@/pages/appointment";
import Profile from "@/pages/profile";

// Dashboard pages
import Dashboard from "@/pages/dashboard";
import DashboardAppointments from "@/pages/dashboard/appointment/pages/list";
import DashboardAppointment from "@/pages/dashboard/appointment/pages/detail";
import DashboardPatients from "@/pages/dashboard/patient/pages/list";
import DashboardPatient from "@/pages/dashboard/patient/pages/detail";
import DashboardSettings from "@/pages/dashboard/settings";

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
          path: "settings",
          element: <DashboardSettings />,
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
