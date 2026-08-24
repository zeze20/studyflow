export const formatMinutesToHours = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) return `${remainingMinutes} dk`;
  if (remainingMinutes === 0) return `${hours} sa`;
  return `${hours} sa ${remainingMinutes} dk`;
};

export const formatDateTr = (dateStr: string): string => {
  try {
    const [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  } catch {
    return dateStr;
  }
};
