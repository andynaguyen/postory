import client from 'src/client';

export const checkForTrackingInfoUpdate = (trackingInfo) => {
  console.log('checking for updates', { trackingInfo });
  return client.request(trackingInfo.carrier, trackingInfo.tracking_number).then((newTrackingInfo) => {
    console.log('got response from server', { newTrackingInfo });
    return newTrackingInfo.tracking_status.status !== trackingInfo.tracking_status.status
      ? { isUpdated: true, trackingInfo: newTrackingInfo }
      : { isUpdated: false, trackingInfo };
  });
};
