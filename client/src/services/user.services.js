import { api } from "./api";

export const register = (data) => {
    return api.post("/user/register" , data)
}

export const login = (data) => {
    return api.post("/user/login" , data)
}