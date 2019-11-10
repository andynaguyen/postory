const infoByHostname = {
  'www.fedex.com': {
    carrier: 'fedex',
    paramNames: ['tracknumbers', 'trknbr', 'trackingnumber'],
  },
  'www.ups.com': {
    carrier: 'ups',
    paramNames: ['tracknum'],
  },
  'tools.usps.com': {
    carrier: 'usps',
    paramNames: ['tLabels', 'qtc_tLabels1'],
  },
  'www.dhl.com': {
    carrier: 'dhl_express',
    paramNames: ['AWB'],
  },
  'www.canadapost.ca': {
    getSearchParams: (windowLocation) =>
      new URLSearchParams(windowLocation.hash.substr(windowLocation.hash.indexOf('?'))),
    carrier: 'canada_post',
    paramNames: ['searchFor'],
  },
};

export const getTrackingNumber = (windowLocation) => {
  const { search, hostname } = windowLocation;
  const info = infoByHostname[hostname];
  const params = info.getSearchParams ? info.getSearchParams(windowLocation) : new URLSearchParams(search);
  return info.paramNames.map((paramName) => params.get(paramName)).filter((paramVal) => paramVal)[0];
};

export const getCarrier = (hostname) => {
  return infoByHostname[hostname].carrier;
};
