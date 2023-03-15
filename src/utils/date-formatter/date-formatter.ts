import translationsRU from '../vocabulary/ru';

export const MILLISECONDS_IN_MINUTE = 60 * 1000;
export const MILLISECONDS_IN_HOUR = 60 * MILLISECONDS_IN_MINUTE;
export const MILLISECONDS_IN_DAY = 24 * MILLISECONDS_IN_HOUR;

export class DateFormatter {
  static getDate = (dateValue: string):Date => {
    const date = new Date(dateValue);

    if (!date) {
      throw new Error(`Date couldn't be recognized: ${dateValue}`);
    }

    return date;
  };

  static getTime = (date: Date): string => {
    const minutes = date.getMinutes();
    return `${date.getHours()}:${minutes < 10 ? `0${minutes}` : minutes}`;
  };

  static getTZ = (date: Date):string => {
    const offsetInHours = date.getTimezoneOffset() / 60;
    return `i-GMT${offsetInHours < 0 ? '+' : '-'}${Math.abs(offsetInHours)}`;
  };

  static getDaysDiff = (date: Date):string => {
    const now = new Date();

    const cleanDate = new Date(date);
    cleanDate.setHours(0, 0, 0, 0);

    const cleanNow = new Date(now);
    cleanNow.setHours(0, 0, 0, 0);

    const diffInDays = (cleanNow.getTime() - cleanDate.getTime()) / MILLISECONDS_IN_DAY;

    if (diffInDays > 7) {
      return `${cleanDate.getDate()} ${cleanDate.getMonth()} ${cleanDate.getFullYear()}`;
    }

    if (diffInDays === 0) {
      return translationsRU.today;
    }

    if (diffInDays === 1) {
      return translationsRU.yesterday;
    }

    if (diffInDays < 5) {
      return `${diffInDays} ${translationsRU.lessThanFiveDaysAgo}`;
    }

    return `${diffInDays} ${translationsRU.daysAgo}`;
  };

  static getRelativeFormat = (dateValue: string) => {
    const date = DateFormatter.getDate(dateValue);
    return `${DateFormatter.getDaysDiff(date)}, ${DateFormatter.getTime(date)} ${DateFormatter.getTZ(date)}`;
  };
}
