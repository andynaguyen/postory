import { DateTime } from 'luxon';

const formatDateTime = (dateTime) => dateTime.toLocaleString(DateTime.DATETIME_MED);

export default {
  formatDateTime,
};
