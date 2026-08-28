export const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getStartOfWeek = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay();

  // Monday = first day of week
  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);
  result.setHours(0, 0, 0, 0);

  return result;
};

export const isSameDay = (a: Date, b: Date) => {
  return formatDateKey(a) === formatDateKey(b);
};

export const isPastDate = (date: Date) => {
  const today = new Date();

  const currentDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return date < currentDay;
};
