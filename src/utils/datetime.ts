import dayjs from 'dayjs'

export function formatPostDate(
  date: dayjs.ConfigType,
  format = 'YYYY-MM-DD',
) {
  // vite-plugin-md 提取 date 的时候，是 utc 时间
  return dayjs.utc(date).format(format)
}
