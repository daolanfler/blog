import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export function formatDate(
  date: dayjs.ConfigType,
  format: string = "YYYY-MM-DD"
) {
  return dayjs(date).format(format);
}
