'use strict';

import client from 'src/client';
import TrackingInfoStorage from 'src/storage';
import createAlert from 'src/contentscripts/alert';
import { getCarrier, getTrackingNumber } from 'src/contentscripts/search/helper';

const trackingNumber = getTrackingNumber(window.location);
if (trackingNumber) {
  createAlert(() => {
    const storage = new TrackingInfoStorage();
    client
      .request(getCarrier(window.location.hostname), trackingNumber)
      .then((trackingInfo) => storage.put(trackingInfo));
  });
}
