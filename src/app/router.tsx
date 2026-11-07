import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRules from "./moduls/auth/ProtectedRules";
import UsersPage from "./pages/UsersPage";
import ChatPage from "./pages/ChatPage";

export const appRouter = createBrowserRouter([
    {path: "/login", element: <LoginPage />},
    {path: "/register", element: <RegisterPage />},
    {
        element: <ProtectedRules />,
        children: [
            {path: "/profile", element: <UsersPage />},
            {path: "/chat", element: <ChatPage /> },
        ]
    },
    {path: "*", element: <Navigate to="/" replace /> },
    {path: "/", element: <Navigate to="/chat" /> },
]);