export const getPartitionedDate = (releaseDate: string | null) => {
  if (!releaseDate) return null;
  const date = new Date(releaseDate);
  return { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() };
};

export const getMonthText = (month: number) => {
  const months: { [key: number]: string } = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  return months[month];
};
