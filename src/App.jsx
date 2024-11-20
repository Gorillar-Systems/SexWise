import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/forgot-password";
import ProfessionalLayout from "./layouts/ProfessionalLayout";
import ProfessionalLogin from "./pages/professional/auth/login/ProfessionalLogin";
import RegisterProfessional from "./pages/professional/auth/register/RegisterProfessional";
import ProfessionalRoute from "./routes/ProfessionalRoute";
import ProfessionalDashboard from "./pages/dashboards/professional";
import ProfessionalAppointments from "./pages/dashboards/professional/appointments";
import ProfessionalConsultations from "./pages/dashboards/professional/consultations";
import ClientRoute from "./routes/ClientRoute";
import ClientDashboardLayout from "./layouts/ClientDashboardLayout";
import ClientDashboard from "./pages/dashboards/client";
import ClientAppointments from "./pages/dashboards/client/appointments";
import Consultation from "./pages/consultation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { USER } from "./constants";
import ProfessionalHome from "./pages/professional/home";
import ProfessionalDashboardLayout from "./layouts/ProfessionalDashboardLayout";

function App() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    // setUser(USER);
    // dispatch({
    //   type: "LOGGED_IN_USER",
    //   payload: USER,
    // });
    const storedUser = JSON.parse(localStorage.getItem("sexWiseUser"));
    console.log(storedUser);
    if (storedUser) {
      setUser(storedUser.user);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: storedUser.user,
      });
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    // -------------Client-----------------------
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "auth/login", element: <Login /> },
        { path: "auth/register", element: <Register /> },
        { path: "auth/forgot-password", element: <ForgotPassword /> },
        {
          path: "/consultation",
          element: (
            <ClientRoute>
              <Consultation />
            </ClientRoute>
          ),
        },
      ],
    },
    
    {
      path: "/dashboard",
      element: (
        <ClientRoute>
          <ClientDashboardLayout />
        </ClientRoute>
      ),
      children: [
        { index: true, element: <ClientDashboard /> },
        { path: "appointments", element: <ClientAppointments /> },
      ],
    },

    // -----------Professional---------------
    {
      path: "/professional",
      element: <ProfessionalLayout />,
      children: [
        { index: true, element: <ProfessionalHome/> },
        { path: "login", element: <ProfessionalLogin /> },
        {
          path: "register",
          element: <RegisterProfessional />,
        },
      ],
    },
    {
      path: "/dashboard/professional",
      element: (
        <ProfessionalRoute>
          <ProfessionalDashboardLayout />
        </ProfessionalRoute>
      ),
      children: [
        { index: true, element: <ProfessionalDashboard /> },
        { path: "appointments", element: <ProfessionalAppointments /> },
        { path: "consultations", element: <ProfessionalConsultations /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
