import api from "./api";
import { LoginRequest } from "@/src/models/LoginRequest";

export const loginApi = async (request: LoginRequest) => {
    const response = await api.post("/auth/login", request );
    return response.data;
};