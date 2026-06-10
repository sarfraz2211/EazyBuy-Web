import api from "./api";
import { LoginRequest  } from "@/src/models/LoginRequest";
import { ResetPasswordRequest } from "@/src/models/ResetPasswordRequest";


export const loginApi = async (request: LoginRequest) => {
    const response = await api.post("/auth/login", request );
    return response.data;
};

export const resetPasswordApi = async ( request: ResetPasswordRequest) => {
    const response = await api.put("/auth/forgetPassword", request);
    return response.data;
}