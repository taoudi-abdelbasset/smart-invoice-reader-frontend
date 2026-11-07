import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./moduls/auth/AuthContext";
import { appRouter } from "./router";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
}