import dayjs from "dayjs";

export const DATE_FORMAT = "MMMM D, YYYY";
export const SDFormat = (date) => {
  try {
    return dayjs(date).format(DATE_FORMAT);
  } catch (e) {
    return null;
  }
};