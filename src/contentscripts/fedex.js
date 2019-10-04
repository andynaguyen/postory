'use strict';

import { request } from '../client';
import TrackingInfoStorage from '../storage';
import createAlert from './alert';

const params = new URLSearchParams(window.location.search);
const trackingNumber = params.get('tracknumbers') || params.get('trknbr');

if (trackingNumber) {
  createAlert(() => {
    const storage = new TrackingInfoStorage();
    request('fedex', trackingNumber).then((trackingInfo) => storage.add(`fedex#${trackingNumber}`, trackingInfo));
  });
}
