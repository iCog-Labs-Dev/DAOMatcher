export function formatTime(milliseconds: number) {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);

  const hrsStr = hours > 0 ? `${hours} hrs` : "";
  const minsStr = minutes > 0 ? `${minutes} mins` : "";
  const secStr = seconds > 0 ? `${seconds} secs` : "";
  const formattedDuration = `${hrsStr} ${minsStr} ${secStr}`;

  return formattedDuration;
}
