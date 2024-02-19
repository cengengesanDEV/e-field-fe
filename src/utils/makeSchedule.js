export const makeSchedule = (start, end) => {
  const schedule = [];
  for (let i = start; i <= end; i++) {
    schedule.push(i);
  }
  return schedule;
};

export const formatHour = (hour) => {
  return `${hour <= 9 ? 0 : ''}${hour}:00`;
};

export const checkAvailability = (bookingTIme, availableHour) => {
  const { clockIn, clockOut } = bookingTIme;
  const requestedHour = [];

  for (let i = clockIn; i < clockOut; i++) {
    requestedHour.push(i);
  }

  const result = { isAvailable: true, booked: null };

  for (let i = 0; i < requestedHour.length; i++) {
    const hour = requestedHour[i];

    if (!availableHour.includes(hour)) {
      result.booked = formatHour(hour);
      result.isAvailable = false;
      break;
    }
  }

  return result;
};
