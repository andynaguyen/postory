import { getCarrier, getTrackingNumber } from 'src/contentscripts/search/helper';

describe('search', () => {
  it('should get carrier', () => {
    const testcases = [
      { hostname: 'www.fedex.com', expectedCarrier: 'fedex' },
      { hostname: 'www.ups.com', expectedCarrier: 'ups' },
      { hostname: 'tools.usps.com', expectedCarrier: 'usps' },
      { hostname: 'www.dhl.com', expectedCarrier: 'dhl_express' },
    ];

    testcases.forEach(({ hostname, expectedCarrier }) => {
      expect(getCarrier(hostname)).toBe(expectedCarrier);
    });
  });

  it('should get tracking number from url', () => {
    const testcases = [
      { hostname: 'www.fedex.com', search: '?tracknumbers=123', expectedTrackingNumber: '123' },
      { hostname: 'www.fedex.com', search: '?trknbr=123', expectedTrackingNumber: '123' },
      { hostname: 'www.ups.com', search: '?tracknum=123', expectedTrackingNumber: '123' },
      { hostname: 'tools.usps.com', search: '?tLabels=123', expectedTrackingNumber: '123' },
      { hostname: 'tools.usps.com', search: '?qtc_tLabels1=123', expectedTrackingNumber: '123' },
      { hostname: 'www.dhl.com', search: '?AWB=123', expectedTrackingNumber: '123' },
    ];

    testcases.forEach(({ hostname, search, expectedTrackingNumber }) => {
      expect(getTrackingNumber({ search, hostname })).toBe(expectedTrackingNumber);
    });
  });
});
