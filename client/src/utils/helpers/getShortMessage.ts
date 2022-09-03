export default function getShortMessage(fullMessage: string) {
  if (fullMessage.length < 30) {
    return fullMessage;
  }

  return fullMessage.slice(0, 28).trim() + "...";
}
