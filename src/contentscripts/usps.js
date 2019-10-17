'use strict';

import { request } from '../client';
import TrackingInfoStorage from '../storage';
import createAlert from './alert';

const params = new URLSearchParams(window.location.search);
const trackingNumber = params.get('tLabels');

if (trackingNumber) {
  createAlert(() => {
    const storage = new TrackingInfoStorage();
    request('usps', trackingNumber).then((trackingInfo) => storage.put(trackingInfo));
  });
}
