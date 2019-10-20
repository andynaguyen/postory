import TrackingInfoStorage from 'src/storage';
import { checkForTrackingInfoUpdate } from 'src/background/check';
import { createStatusNotification } from 'src/notification';

const storage = new TrackingInfoStorage();
const interval = 1000 * 60 * 60 * 2; // 2 hours

const isTerminalStatus = (trackingInfo) => {
  const status = trackingInfo.tracking_status.status;
  return status === 'DELIVERED' || status === 'RETURNED' || status === 'FAILURE';
};

setInterval(() => {
  storage.list((trackingInfos) => {
    trackingInfos.forEach((trackingInfo) => {
      if (isTerminalStatus(trackingInfo)) {
        checkForTrackingInfoUpdate(trackingInfo).then((result) => {
          if (result.isUpdated) {
            createStatusNotification(result.trackingInfo);
            storage.put(result.trackingInfo);
          }
        });
      }
    });
  });
}, interval);
