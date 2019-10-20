import { TrackingInfoList } from 'src/templates';
import util from 'src/util';

describe('TrackingInfoList', () => {
  it('should generate empty ul given empty list', () => {
    const template = TrackingInfoList([]);
    expect(template).toMatchSnapshot();
  });

  it("should generate li's given tracking info list", () => {
    util.formatDateTime = jest
      .fn()
      .mockReturnValueOnce('Oct 18, 2019, 12:09 PM')
      .mockReturnValueOnce('Oct 15, 2019, 3:00 AM');
    const template = TrackingInfoList([
      {
        carrier: 'fedex',
        eta: '2019-10-18T19:09:20-0000',
        tracking_number: '12345',
        tracking_status: {
          status: 'DELIVERED',
        },
      },
      {
        carrier: 'ups',
        eta: '2019-10-15T10:00:00-0000',
        tracking_number: 'ABCDEF',
        tracking_status: {
          status: 'TRANSIT',
        },
      },
    ]);
    expect(template).toMatchSnapshot();
  });
});
