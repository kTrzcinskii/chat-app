import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import { ILoginSchema } from "../utils/schemas/LoginSchema";
import ILoginRegisterResponse from "../utils/server-responses-types/login-register-response";

const endpoint = `${BACKEND_URL}/auth/login`;

export default function login(values: ILoginSchema) {
  return axiosInstance.post<ILoginRegisterResponse>(endpoint, values);
}
