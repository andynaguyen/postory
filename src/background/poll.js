import TrackingInfoStorage from '../storage';
import { request } from '../client';

const storage = new TrackingInfoStorage();
const interval = 1000 * 60 * 60 * 2; // 2 hours
setInterval(() => {
  storage.getAll((trackingInfos) => {
    trackingInfos.forEach((trackingInfo) => {
      console.log('polling for updates', { trackingInfo });
      request(trackingInfo.carrier, trackingInfo.tracking_number).then((response) => {
        console.log('got response from server', { response });
        storage.put(response);
      });
    });
  });
}, interval);
