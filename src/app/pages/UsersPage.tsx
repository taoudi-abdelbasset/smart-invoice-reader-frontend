import { useState } from "react";
import { useAuth } from "../moduls/auth/AuthContext";
import { useUsers } from "../moduls/users/useUsers";
import UserForm from "../moduls/users/UserForm";
import type { UserInput } from "../moduls/users/types";

export default function UsersPage() {
  const { logout } = useAuth();
  const { user, loading, error, editUser } = useUsers();
  const [formError, setFormError] = useState("");

  async function handleEdit(input: UserInput) {
    if (!user) return;
    try {
      await editUser(user.id, input);
      setFormError("");
    } catch (e) {
      setFormError((e as Error).message);
    }
  }

  if (loading)
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" />
      </div>
    );

  if (!user)
    return <div className="alert alert-danger m-4">{error}</div>;

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand mb-0 h1">Smart Invoice Reader</span>
        <button className="btn btn-outline-light btn-sm" onClick={logout}>
          Logout
        </button>
      </nav>

      <div className="container py-5" style={{ maxWidth: 450 }}>
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h4 className="mb-1">Profile</h4>
            <p className="text-muted">Logged in as {user.username}</p>

            {formError && <div className="alert alert-danger py-2">{formError}</div>}

            <UserForm
              key={user.id}
              initialUsername={user.username}
              submitLabel="Save changes"
              onSubmit={handleEdit}
            />
          </div>
        </div>
      </div>
    </>
  );
}