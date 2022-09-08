export default function getShortMessage(fullMessage: string, length?: number) {
  const maxLenght = length ?? 30;
  if (fullMessage.length < maxLenght) {
    return fullMessage;
  }

  return fullMessage.slice(0, maxLenght - 2).trim() + "...";
}
