import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import ISuccessfulResponse from "../utils/server-responses-types/SuccessfulResponse";

export default function deleteInvitation(invitationId: string) {
  const endpoint = `${BACKEND_URL}/invitations/${invitationId}`;
  return axiosInstance.delete<ISuccessfulResponse>(endpoint);
}
