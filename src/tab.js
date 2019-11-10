const urlPrefixByCarrier = {
  fedex: 'https://www.fedex.com/apps/fedextrack/?tracknumbers=',
  ups: 'https://www.ups.com/track?tracknum=',
  usps: 'https://tools.usps.com/go/TrackConfirmAction?tLabels=',
  dhl_express: 'https://www.dhl.com/en/express/tracking.html?AWB=',
  canada_post: 'https://www.canadapost.ca/trackweb/en#/search?searchFor=',
};

export const openCarrierTab = ({ carrier, tracking_number }) => {
  const url = `${urlPrefixByCarrier[carrier]}${tracking_number}`;
  chrome.tabs.create({ url });
};
