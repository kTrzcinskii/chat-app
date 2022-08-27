import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";
import register from "../../api/register";
import { IRegisterSchema } from "../../utils/schemas/RegisterSchema";
import IServerErrorResponse from "../../utils/server-responses-types/error-response";
import ILoginRegisterResponse from "../../utils/server-responses-types/login-register-response";

export default function useRegister() {
  return useMutation<
    AxiosResponse<ILoginRegisterResponse>,
    Error | AxiosError<IServerErrorResponse>,
    IRegisterSchema
  >((values: IRegisterSchema) => register(values));
}
