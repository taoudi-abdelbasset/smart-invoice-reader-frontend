import { createContext, useContext, useState, type ReactNode } from "react"
import { TokenStorage } from "../../tools/tokenStorage";
import { AuthService } from "./AuthService";

type AuthContextType = {
  isAuth: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children:ReactNode}) => {
    const [isAuth, setIsAuth] = useState(!!TokenStorage.get())

    const login = async (username:string , password:string) => {
        await AuthService.login(username,password);
        setIsAuth(true);
    };

    const logout = () => {
        AuthService.logout();
        setIsAuth(false);
    };

    const auth_values = {isAuth, login, logout};

    return (
        <AuthContext.Provider value={auth_values}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};