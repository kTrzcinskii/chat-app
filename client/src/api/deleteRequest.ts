import axiosInstance from "../utils/axiosInstance";
import { BACKEND_URL } from "../utils/constants";

export default function deleteRequest(requestId: string) {
  const endpoint = `${BACKEND_URL}/requests/${requestId}`;
  return axiosInstance.delete(endpoint);
}
