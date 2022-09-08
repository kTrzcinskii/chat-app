type status = "INVITED" | "REQUESTED" | "NO-STATUS";
type privacyMode = "PUBLIC" | "PRIVATE";

export default function getButtonText(
  status: status,
  privacyMode: privacyMode
): "Accept Invitation" | "Request Sent" | "Send Request" | "Join Chatroom" {
  if (status === "INVITED") {
    return "Accept Invitation";
  }
  if (status === "REQUESTED") {
    return "Request Sent";
  }
  if (status === "NO-STATUS") {
    if (privacyMode === "PRIVATE") {
      return "Send Request";
    }
    if (privacyMode === "PUBLIC") {
      return "Join Chatroom";
    }
  }
  return "Join Chatroom";
}
