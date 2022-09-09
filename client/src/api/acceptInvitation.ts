import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";
import ISuccessfulResponse from "../utils/server-responses-types/SuccessfulResponse";

export default function acceptInvitation(inivitaionId: string) {
  const endpoint = `${BACKEND_URL}/invitations/accept/${inivitaionId}`;
  return axiosInstance.post<ISuccessfulResponse>(endpoint);
}
