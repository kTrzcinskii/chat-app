import {
  differenceInDays,
  differenceInWeeks,
  differenceInYears,
  format,
} from "date-fns";

export default function getAppropriateTime(time: string) {
  const messageDate = new Date(time);
  const currentDate = new Date();
  if (differenceInDays(currentDate, messageDate) === 0) {
    return format(messageDate, "HH:mm");
  }

  if (differenceInWeeks(currentDate, messageDate) === 0) {
    return format(messageDate, "EEEE");
  }

  if (differenceInYears(currentDate, messageDate) === 0) {
    return format(messageDate, "do MMM");
  }

  return format(messageDate, "Y");
}
