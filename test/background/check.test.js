import { checkForTrackingInfoUpdate } from 'src/background/check';
import client from 'src/client';

describe('checkForTrackingInfoUpdate', () => {
  it('should return updated tracking info', () => {
    const oldTrackingInfo = { tracking_status: { status: 'old' } };
    const newTrackingInfo = { tracking_status: { status: 'updated' } };
    client.request = jest.fn().mockResolvedValue(newTrackingInfo);
    return expect(checkForTrackingInfoUpdate(oldTrackingInfo)).resolves.toEqual({
      isUpdated: true,
      trackingInfo: newTrackingInfo,
    });
  });

  it('should return old tracking info', () => {
    const oldTrackingInfo = { tracking_status: { status: 'old' } };
    client.request = jest.fn().mockResolvedValue(oldTrackingInfo);
    return expect(checkForTrackingInfoUpdate(oldTrackingInfo)).resolves.toEqual({
      isUpdated: false,
      trackingInfo: oldTrackingInfo,
    });
  });
});
