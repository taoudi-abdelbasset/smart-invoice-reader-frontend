import { useState, type FormEvent } from "react";
import type { UserInput } from "./types";

type Props = {
  initialUsername?: string;
  submitLabel: string;
  onSubmit: (input: UserInput) => Promise<void>;
};

export default function UserForm({
  submitLabel,
  onSubmit,
}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await onSubmit({ username, password });
    setPassword("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-floating mb-3">
        <input
          id="username"
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="username">Username</label>
      </div>

      <div className="form-floating mb-3">
        <input
          id="password"
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {submitLabel}
      </button>
    </form>
  );
}
