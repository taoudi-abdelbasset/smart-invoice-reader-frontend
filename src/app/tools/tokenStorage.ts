import { TOKEN_KEY } from "../config/env";

export const TokenStorage = {
    get: () => localStorage.getItem(TOKEN_KEY),
    set: (token_value:string) => localStorage.setItem(TOKEN_KEY,token_value),
    clear: () => localStorage.setItem(TOKEN_KEY,""),
}