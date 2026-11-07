import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRules from "./moduls/auth/ProtectedRules";
import UsersPage from "./pages/UsersPage";

export const appRouter = createBrowserRouter([
    {path: "/login", element: <LoginPage />},
    {path: "/register", element: <RegisterPage />},
    {
        element: <ProtectedRules />,
        children: [
            {path: "/profile", element: <UsersPage />},
        ]
    },
    {path: "*", element: <Navigate to="/" replace /> },
]);