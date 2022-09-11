import {
  differenceInDays,
  format,
  differenceInWeeks,
  differenceInYears,
} from "date-fns";

export default function getMessageTime(time: string) {
  const messageDate = new Date(time);
  const currentDate = new Date();
  if (differenceInDays(currentDate, messageDate) === 0) {
    return format(messageDate, "HH:mm");
  }

  if (differenceInWeeks(currentDate, messageDate) === 0) {
    return format(messageDate, "HH:mm, EEEE");
  }

  if (differenceInYears(currentDate, messageDate) === 0) {
    return format(messageDate, "HH:mm, do MMM");
  }

  return format(messageDate, "HH:mm, do MMM, Y");
}
