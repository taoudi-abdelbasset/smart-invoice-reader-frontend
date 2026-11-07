import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "../moduls/users/UserForm";
import { UserService } from "../moduls/users/UserService";
import type { UserInput } from "../moduls/users/types";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleRegister(input: UserInput) {
    try {
      await UserService.create(input);
      navigate("/login");
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-sm w-100" style={{ maxWidth: 400 }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4">Register</h2>
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <UserForm submitLabel="Register" onSubmit={handleRegister} />

          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}