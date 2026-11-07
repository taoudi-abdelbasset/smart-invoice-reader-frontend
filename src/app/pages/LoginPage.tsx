import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../moduls/auth/AuthContext";
import UserForm from "../moduls/users/UserForm";
import type { UserInput } from "../moduls/users/types";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleLogin({ username, password }: UserInput) {
    try {
      await login(username, password);
      navigate("/profile", { replace: true });
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm w-100" style={{ maxWidth: 400 }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <UserForm submitLabel="Login" onSubmit={handleLogin} />

          <p className="text-center mt-3 mb-0">
            No account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}