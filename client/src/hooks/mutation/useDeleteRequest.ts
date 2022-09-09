import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import deleteRequest from "../../api/deleteRequest";
import IServerErrorResponse from "../../utils/server-responses-types/error-response";
import ISuccessfulResponse from "../../utils/server-responses-types/SuccessfulResponse";

interface RequestId {
  requestId: string;
}

export default function useDeleteRequest() {
  return useMutation<
    AxiosResponse<ISuccessfulResponse>,
    Error | AxiosError<IServerErrorResponse>,
    RequestId
  >((values: RequestId) => deleteRequest(values.requestId));
}
