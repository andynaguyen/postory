'use strict';

import client from 'src/client';
import TrackingInfoStorage from 'src/storage';
import createAlert from 'src/contentscripts/alert';
import { getCarrier, getTrackingNumber } from 'src/contentscripts/search/helper';

const carrier = getCarrier(window.location.hostname);
const trackingNumber = getTrackingNumber(window.location);
if (trackingNumber) {
  createAlert(carrier, trackingNumber, () => {
    const storage = new TrackingInfoStorage();
    return client.request(carrier, trackingNumber).then((trackingInfo) => storage.put(trackingInfo));
  });
}
