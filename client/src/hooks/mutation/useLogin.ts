import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import login from "../../api/login";
import { ILoginSchema } from "../../utils/schemas/LoginSchema";
import IServerErrorResponse from "../../utils/server-responses-types/error-response";
import ILoginRegisterResponse from "../../utils/server-responses-types/login-register-response";

export default function useLogin() {
  return useMutation<
    AxiosResponse<ILoginRegisterResponse>,
    Error | AxiosError<IServerErrorResponse>,
    ILoginSchema
  >((values: ILoginSchema) => login(values));
}
