import http from "../../tools/http";
import type { UserInfo, UserInput, UserMinInfo } from "./types";

export const UserService = {
  getCurrent: () => http<UserMinInfo>("auth"),
  create: (user: UserInput) =>
    http<UserInfo>("users", { method: "POST", body: JSON.stringify(user) }),
  update: (user_id: string, user:UserInput) => 
    http<UserInfo>(`users/${user_id}`, {method:"PUT", body: JSON.stringify(user)}),
};
