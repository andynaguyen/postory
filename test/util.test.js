import { DateTime } from 'luxon';
import util from 'src/util';

describe('formatDateTime', () => {
  it('should format using DATETIME_MED', () => {
    const mockToLocaleString = jest.fn();
    const dateTime = {
      toLocaleString: mockToLocaleString,
    };

    util.formatDateTime(dateTime);
    expect(mockToLocaleString).toBeCalledWith(DateTime.DATETIME_MED);
  });
});
