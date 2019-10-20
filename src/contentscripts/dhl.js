'use strict';

import client from 'src/client';
import TrackingInfoStorage from 'src/storage';
import createAlert from 'src/contentscripts/alert';

const params = new URLSearchParams(window.location.search);
const trackingNumber = params.get('AWB');

if (trackingNumber) {
  createAlert(() => {
    const storage = new TrackingInfoStorage();
    client.request('dhl_express', trackingNumber).then((trackingInfo) => storage.put(trackingInfo));
  });
}
