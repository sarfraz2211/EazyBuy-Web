import api from "./api";
import { LoginRequest  } from "@/src/models/LoginRequest";
import { ResetPasswordRequest } from "@/src/models/ResetPasswordRequest";
import type { LoginResponse } from "@/src/models/LoginResponse";


export const loginApi = async (request: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", request );
    return response.data;
};

export const resetPasswordApi = async ( request: ResetPasswordRequest): Promise<LoginResponse> => {
    const response = await api.put("/auth/forgetPassword", request);
    return response.data;
}

export const registerApi = async ( request: FormData): Promise<LoginResponse> => {

  const formData = new FormData();

  formData.append("name",request.get("name") as string);

  formData.append("contactNumber",request.get("contactNumber") as string);

  formData.append("password",request.get("password") as string);

  formData.append("address",request.get("address") as string);

  formData.append( "merchantId", request.get("merchantId") as string);

  formData.append("image",request.get("image") as File );

  const response = await api.post("/auth/register",  formData, {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data;
};
