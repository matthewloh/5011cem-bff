import { formatDate } from "@/utils/formatters";
import { addDays, isValid, startOfDay, subDays } from "date-fns";

export const RANGE_OPTIONS = {
  last_7_days: {
    label: "Last 7 Days",
    startDate: startOfDay(subDays(new Date(), 6)),
    endDate: new Date(),
  },
  last_14_days: {
    label: "Last 14 Days",
    startDate: startOfDay(subDays(new Date(), 13)),
    endDate: new Date(),
  },
  last_30_days: {
    label: "Last 30 Days",
    startDate: startOfDay(subDays(new Date(), 29)),
    endDate: new Date(),
  },
  last_90_days: {
    label: "Last 90 Days",
    startDate: startOfDay(subDays(new Date(), 89)),
    endDate: new Date(),
  },
  last_180_days: {
    label: "Last 180 Days",
    startDate: startOfDay(subDays(new Date(), 179)),
    endDate: new Date(),
  },
  last_365_days: {
    label: "Last 365 Days",
    startDate: startOfDay(subDays(new Date(), 364)),
    endDate: new Date(),
  },
  from_2020_to_2021: {
    label: "2020 - 2021",
    startDate: new Date("2020-01-01"),
    endDate: new Date("2021-12-31"),
  },
  from_2021_to_2022: {
    label: "2021 - 2022",
    startDate: new Date("2021-01-01"),
    endDate: new Date("2022-12-31"),
  },
  from_2022_to_2023: {
    label: "2022 - 2023",
    startDate: new Date("2022-01-01"),
    endDate: new Date("2023-12-31"),
  },
  from_2021_to_now: {
    label: "2021 - Now",
    startDate: new Date("2021-01-01"),
    endDate: new Date(),
  },
  from_2022_to_now: {
    label: "2022 - Now",
    startDate: new Date("2022-01-01"),
    endDate: new Date(),
  },
  from_2023_to_now: {
    label: "2023 - Now",
    startDate: new Date("2023-01-01"),
    endDate: new Date(),
  },
  all_time: {
    label: "All Time",
    startDate: null, // null means no start date constraint
    endDate: new Date(),
  },
};

export function getRangeOption(
  range: string | undefined,
  from?: string,
  to?: string,
) {
  if (range == null) {
    const startDate = new Date(from || "");
    const endDate = new Date(to || "");
    if (!isValid(startDate) || !isValid(endDate)) return;

    return {
      // label: "Custom Range", // "Custom Range
      label: `${formatDate(startDate)} - ${formatDate(endDate)}`,
      startDate,
      endDate,
    };
  }
  return RANGE_OPTIONS[range as keyof typeof RANGE_OPTIONS];
}

export const PREDICTION_RANGE_OPTIONS = {
  last_7_days: {
    label: "Last 7 Days",
    startDate: startOfDay(subDays(new Date(), 6)),
    endDate: new Date(),
  },
  last_14_days: {
    label: "Last 14 Days",
    startDate: startOfDay(subDays(new Date(), 13)),
    endDate: new Date(),
  },
  last_30_days: {
    label: "Last 30 Days",
    startDate: startOfDay(subDays(new Date(), 29)),
    endDate: new Date(),
  },
  last_90_days: {
    label: "Last 90 Days",
    startDate: startOfDay(subDays(new Date(), 89)),
    endDate: new Date(),
  },
  last_180_days: {
    label: "Last 180 Days",
    startDate: startOfDay(subDays(new Date(), 179)),
    endDate: new Date(),
  },
  last_365_days: {
    label: "Last 365 Days",
    startDate: startOfDay(subDays(new Date(), 364)),
    endDate: new Date(),
  },
  from_2020_to_2021: {
    label: "2020 - 2021",
    startDate: new Date("2020-01-01"),
    endDate: new Date("2021-12-31"),
  },
  from_2021_to_2022: {
    label: "2021 - 2022",
    startDate: new Date("2021-01-01"),
    endDate: new Date("2022-12-31"),
  },
  from_2022_to_2023: {
    label: "2022 - 2023",
    startDate: new Date("2022-01-01"),
    endDate: new Date("2023-12-31"),
  },
  from_2021_to_now: {
    label: "2021 - Now",
    startDate: new Date("2021-01-01"),
    endDate: new Date(),
  },
  from_2022_to_now: {
    label: "2022 - Now",
    startDate: new Date("2022-01-01"),
    endDate: new Date(),
  },
  from_2023_to_now: {
    label: "2023 - Now",
    startDate: new Date("2023-01-01"),
    endDate: new Date(),
  },
  next_7_days: {
    label: "Next 7 Days",
    startDate: new Date(),
    endDate: startOfDay(addDays(new Date(), 6)),
  },
  next_14_days: {
    label: "Next 14 Days",
    startDate: new Date(),
    endDate: startOfDay(addDays(new Date(), 13)),
  },
  next_30_days: {
    label: "Next 30 Days",
    startDate: new Date(),
    endDate: startOfDay(addDays(new Date(), 29)),
  },
  next_90_days: {
    label: "Next 90 Days",
    startDate: new Date(),
    endDate: startOfDay(addDays(new Date(), 89)),
  },
  next_180_days: {
    label: "Next 180 Days",
    startDate: new Date(),
    endDate: startOfDay(addDays(new Date(), 179)),
  },
  next_365_days: {
    label: "Next 365 Days",
    startDate: new Date(),
    endDate: startOfDay(addDays(new Date(), 364)),
  },
  next_2_years: {
    label: "Next 2 Years",
    startDate: new Date(),
    endDate: startOfDay(addDays(new Date(), 730)),
  },
};

export function getPredictionRangeOption(
  range: string | undefined,
  from?: string,
  to?: string,
) {
  if (range == null) {
    const startDate = new Date(from || "");
    const endDate = new Date(to || "");
    if (!isValid(startDate) || !isValid(endDate)) return;

    return {
      // label: "Custom Range", // "Custom Range
      label: `${formatDate(startDate)} - ${formatDate(endDate)}`,
      startDate,
      endDate,
    };
  }
  return PREDICTION_RANGE_OPTIONS[
    range as keyof typeof PREDICTION_RANGE_OPTIONS
  ];
}
