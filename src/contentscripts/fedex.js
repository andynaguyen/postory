'use strict';

import { request } from './client';

const params = new URLSearchParams(window.location.search);
const trackingNumber = params.get('tracknumbers') || params.get('trknbr');

if (trackingNumber) {
  request('fedex', trackingNumber);
}
