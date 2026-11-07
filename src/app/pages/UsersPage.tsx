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

  if (loading) return <p>Loading...</p>;
  if (!user) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h1>Profile</h1>
      <p>Logged in as: {user.username}</p>
      {formError && <p style={{ color: "red" }}>{formError}</p>}

      <UserForm
        key={user.id}
        initialUsername={user.username}
        submitLabel="Save changes"
        onSubmit={handleEdit}
      />
    </div>
  );
}