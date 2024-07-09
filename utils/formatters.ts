import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  endOfWeek,
  interval,
  max,
  min,
  startOfWeek
} from "date-fns";

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatDateTime(date: Date) {
  return DATE_TIME_FORMATTER.format(date);
}

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
});

export function formatDate(date: Date) {
  return DATE_FORMATTER.format(date);
}


export function getChartDateArray(startDate: Date, endDate: Date = new Date()) {
  const days = differenceInDays(endDate, startDate);

  if (days < 30) {
    return {
      array: eachDayOfInterval(interval(startDate, endDate)),
      format: formatDate,
    };
  }

  const weeks = differenceInWeeks(endDate, startDate);
  if (weeks < 30) {
    return {
      array: eachWeekOfInterval(interval(startDate, endDate)),
      format: (date: Date) => {
        const start = max([startOfWeek(date), startDate]);
        const end = min([endOfWeek(date), endDate]);

        return `${formatDate(start)} - ${formatDate(end)}`;
      },
    };
  }

  const months = differenceInMonths(endDate, startDate);
  if (months < 30) {
    return {
      array: eachMonthOfInterval(interval(startDate, endDate)),
      format: new Intl.DateTimeFormat("en", { month: "long", year: "numeric" })
        .format,
    };
  }

  return {
    array: eachYearOfInterval(interval(startDate, endDate)),
    format: new Intl.DateTimeFormat("en", { year: "numeric" }).format,
  };
}
