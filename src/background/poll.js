import TrackingInfoStorage from 'src/storage';
import { request } from 'src/client';

const storage = new TrackingInfoStorage();
const interval = 1000 * 60 * 60 * 2; // 2 hours

const isTerminalStatus = (trackingInfo) => {
  const status = trackingInfo.tracking_status.status;
  return status === 'DELIVERED' || status === 'RETURNED' || status === 'FAILURE';
};

setInterval(() => {
  storage.getAll((trackingInfos) => {
    trackingInfos.forEach((trackingInfo) => {
      console.log('polling for updates', { trackingInfo });
      if (isTerminalStatus) {
        console.log('terminal status found, sending notification alert');
        // TODO: send alert
      } else {
        request(trackingInfo.carrier, trackingInfo.tracking_number).then((response) => {
          console.log('got response from server', { response });
          storage.put(response);
        });
      }
    });
  });
}, interval);
