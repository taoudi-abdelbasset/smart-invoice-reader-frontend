import { createContext, useContext, useState } from "react"
import { TokenStorage } from "../../tools/tokenStorage";
import { AuthService } from "./AuthService";


const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
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

export const useAuth = () => useContext(AuthContext);