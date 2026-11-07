import { useEffect, useState } from "react";
import type { UserInput, UserMinInfo } from "./types";
import { UserService } from "./UserService";

export function useUsers() {
  const [user, setUser] = useState<UserMinInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    UserService.getCurrent()
      .then(setUser)
      .catch(() => setError("Could not load user"))
      .finally(() => setLoading(false));
  }, []);

  const editUser = async (user_id: string, input: UserInput) => {
    const updated = await UserService.update(user_id, input);
    setUser(updated);
  };

  return { user, loading, error, editUser };
}
