import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRules from "./moduls/auth/ProtectedRules";
import UsersPage from "./pages/UsersPage";
import ChatPage from "./pages/ChatPage";
import AgentsPage from "./pages/AgentsPage";
import AgentNewPage from "./pages/AgentNewPage";
import AgentDetailPage from "./pages/AgentDetailPage";

export const appRouter = createBrowserRouter([
    {path: "/login", element: <LoginPage />},
    {path: "/register", element: <RegisterPage />},
    {
        element: <ProtectedRules />,
        children: [
            {path: "/profile", element: <UsersPage />},
            {path: "/chat", element: <ChatPage /> },
            {
                path: "/agents",
                element: <AgentsPage />,
                children: [
                    {
                        index: true,
                        element: (
                            <div className="text-muted text-center my-5">
                                Select an agent or create a new one
                            </div>
                        ),
                    },
                    {path: "new", element: <AgentNewPage />},
                    {path: ":id", element: <AgentDetailPage tab="details" />},
                    {path: ":id/tools", element: <AgentDetailPage tab="tools" />},
                ],
            },
        ]
    },
    {path: "*", element: <Navigate to="/" replace /> },
    {path: "/", element: <Navigate to="/chat" /> },
]);