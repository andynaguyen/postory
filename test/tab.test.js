import { openCarrierTab } from 'src/tab';

describe('openCarrierTab', () => {
  it('should call chrome tabs create with url', () => {
    const mockCreate = jest.fn();
    global.chrome = {
      tabs: {
        create: mockCreate,
      },
    };

    openCarrierTab({ carrier: 'fedex', tracking_number: '123' });
    expect(mockCreate).toBeCalledWith({ url: 'https://www.fedex.com/apps/fedextrack/?tracknumbers=123' });
  });
});
