import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import acceptInvitation from "../../api/acceptInvitation";
import IServerErrorResponse from "../../utils/server-responses-types/error-response";
import ISuccessfulResponse from "../../utils/server-responses-types/SuccessfulResponse";

interface InvitationId {
  invitationId: string;
}

export default function useAcceptInvitation() {
  return useMutation<
    AxiosResponse<ISuccessfulResponse>,
    Error | AxiosError<IServerErrorResponse>,
    InvitationId
  >((values: InvitationId) => acceptInvitation(values.invitationId));
}
