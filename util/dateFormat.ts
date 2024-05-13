import { format, isToday, parseISO } from 'date-fns';

/**
 * Formats the timestamp into a user-friendly string.
 * @param {Date | string} timestamp - The timestamp of the last message.
 * @returns {string} - The formatted date.
 */
const formatDate = (timestamp: Date | string): string => {
  // Ensure the timestamp is a Date object
  let date = timestamp instanceof Date ? timestamp : parseISO(timestamp);

  if (isToday(date)) {
    // Return the time if the message was sent today
    return format(date, 'HH:mm');
  } else   {

    return format(date, 'dd MMM');
  }
};

export default formatDate;