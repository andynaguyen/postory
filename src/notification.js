import { ImgFileByCarrier } from 'src/constants';

export const createStatusNotification = (trackingInfo) => {
  chrome.notifications.create(undefined, {
    type: 'basic',
    iconUrl: ImgFileByCarrier[trackingInfo.carrier],
    title: `Postory - ${trackingInfo.tracking_number}`,
    message: `Your package has changed status: ${trackingInfo.tracking_status.status}`,
  });
};
