import TrackingInfoStorage from 'src/storage';

describe('TrackingInfoStorage', () => {
  let mockSet;
  let mockGet;
  let mockRemove;

  beforeEach(() => {
    mockSet = jest.fn();
    mockGet = jest.fn();
    mockRemove = jest.fn();
    global.chrome = {
      storage: {
        sync: {
          set: mockSet,
          get: mockGet,
          remove: mockRemove,
        },
      },
    };
  });

  it('should add tracking info using carrier#tracking_number as key', () => {
    const trackingInfo = {
      carrier: 'carrier',
      tracking_number: 'tracking_number',
    };
    const storage = new TrackingInfoStorage();

    storage.put(trackingInfo);
    expect(mockSet).toBeCalledWith({ 'carrier#tracking_number': trackingInfo }, storage.dispatchMessage);
  });

  it('should use key passed in for get', () => {
    const storage = new TrackingInfoStorage();
    storage.get('key', undefined);
    expect(mockGet.mock.calls[0][0]).toBe('key');
  });

  it('should use null as key for list', () => {
    const storage = new TrackingInfoStorage();
    storage.list(undefined);
    expect(mockGet.mock.calls[0][0]).toBeNull();
  });

  it('should use key passed in to call remove', () => {
    const storage = new TrackingInfoStorage();
    storage.remove('key');
    expect(mockRemove).toBeCalledWith('key');
  });

  it('should send message via chrome runtime', () => {
    const storage = new TrackingInfoStorage();
    const mockSendMessage = jest.fn();
    global.chrome = {
      runtime: {
        sendMessage: mockSendMessage,
      },
    };
    storage.dispatchMessage();
    expect(mockSendMessage).toBeCalledWith({ isStorageStale: true });
  });
});
