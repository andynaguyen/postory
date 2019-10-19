'use strict';

import { request } from 'src/client';
import TrackingInfoStorage from 'src/storage';
import createAlert from 'src/contentscripts/alert';

const params = new URLSearchParams(window.location.search);
const trackingNumber = params.get('tracknumbers') || params.get('trknbr');

if (trackingNumber) {
  createAlert(() => {
    const storage = new TrackingInfoStorage();
    request('fedex', trackingNumber).then((trackingInfo) => storage.put(trackingInfo));
  });
}
