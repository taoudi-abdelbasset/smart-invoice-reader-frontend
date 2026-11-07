import { SERVER_URL } from "../../config/env"
import { TokenStorage } from "../../tools/tokenStorage";

export const AuthService = {
    async login(username:string, password:string){
        const req_body = new URLSearchParams({username,password});
        const res = await fetch(`${SERVER_URL}auth/token`, { method:"POST", body: req_body});
        if(!res.ok) {
            throw new Error("Somthing went wrong when login!");
        }
        const data = await res.json();
        TokenStorage.set(data.access_token);
    },
    register(username:string, password:string) {
        // Logic to create a user
    },
    logout(){
        TokenStorage.clear();
    },
}