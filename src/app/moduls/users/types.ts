export type User = {
  id: string;
  username: string;
  password: string;
  create_at: string;
};

export type UserInfo = Omit<User, "password">;

export type UserInput = Omit<User, "id" | "create_at">;

export type UserMinInfo = Omit<User, "create_at" | "password">;
