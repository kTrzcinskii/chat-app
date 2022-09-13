import jwtDecode from "jwt-decode";

export default function useGetCurrentUserId() {
  if (typeof window !== "undefined") {
    const jwtToken = localStorage.getItem("access_token");
    const { sub }: { sub: string } = jwtDecode(jwtToken!);
    return sub;
  }
}
