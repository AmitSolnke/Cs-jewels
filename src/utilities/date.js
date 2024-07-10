import { DateTime } from 'luxon';

export const formatDate = (date) => {
    return DateTime.fromISO(date).toFormat('dd LLL yyyy');
}