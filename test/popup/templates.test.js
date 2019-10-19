import { TrackingInfoList } from '../../src/popup/templates';

describe('TrackingInfoList', () => {
  it('should generate empty ul given empty list', () => {
    const template = TrackingInfoList([]);
    expect(template).toMatchSnapshot();
  });

  it("should generate li's given tracking info list", () => {
    const template = TrackingInfoList([
      {
        carrier: 'fedex',
        eta: '2019-10-18T19:09:20-0700',
        tracking_number: '12345',
        tracking_status: {
          status: 'DELIVERED',
        },
      },
      {
        carrier: 'ups',
        eta: '2019-10-15T10:00:00-0700',
        tracking_number: 'ABCDEF',
        tracking_status: {
          status: 'TRANSIT',
        },
      },
    ]);
    expect(template).toMatchSnapshot();
  });
});
