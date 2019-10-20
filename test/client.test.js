import client from '../src/client';

describe('client', () => {
  it('should construct correct endpoint to fetch from', () => {
    const mockFetch = jest.fn(() => Promise.resolve({ json: () => {} }));
    global.fetch = mockFetch;
    process.env.ENDPOINT = 'endpoint';
    client.request('carrier', 'trackingNumber');

    expect(mockFetch).toBeCalledWith('endpoint/track?carrier=carrier&trackingNumber=trackingNumber');
  });
});
