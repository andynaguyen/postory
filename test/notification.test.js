import { createStatusNotification } from 'src/notification';
import { ImgFileByCarrier } from 'src/constants';

describe('notification', () => {
  it('should create status notification', () => {
    const mockCreate = jest.fn(0);
    global.chrome = {
      notifications: {
        create: mockCreate,
      },
    };
    const trackingInfo = {
      carrier: 'fedex',
      tracking_number: '1234567890123456789000',
      tracking_status: {
        status: 'DELIVERED',
      },
    };

    createStatusNotification(trackingInfo);
    expect(mockCreate).toBeCalledWith(undefined, {
      type: 'basic',
      iconUrl: ImgFileByCarrier['fedex'],
      title: 'Postory - 1234567890123456789000',
      message: 'Your package has changed status: DELIVERED',
    });
  });
});
