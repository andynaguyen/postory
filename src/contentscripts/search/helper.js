const infoByHostname = {
  'www.fedex.com': {
    carrier: 'fedex',
    paramNames: ['tracknumbers', 'trknbr'],
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
};

export const getTrackingNumber = ({ search, hostname }) => {
  const params = new URLSearchParams(search);
  const info = infoByHostname[hostname];
  return info.paramNames.map((paramName) => params.get(paramName)).filter((paramVal) => paramVal)[0];
};

export const getCarrier = (hostname) => {
  return infoByHostname[hostname].carrier;
};
