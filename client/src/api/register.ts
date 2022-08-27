import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import { IRegisterSchema } from "../utils/schemas/RegisterSchema";
import ILoginRegisterResponse from "../utils/server-responses-types/login-register-response";

const endpoint = `${BACKEND_URL}/auth/register`;

export default function register(values: IRegisterSchema) {
  return axiosInstance.post<ILoginRegisterResponse>(endpoint, values);
}
