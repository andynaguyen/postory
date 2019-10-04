const getEndpoint = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return process.env.ENDPOINT;
    case 'development':
      return 'http://localhost:3000';
    default:
      return '';
  }
};

export const request = (carrier, trackingNumber) => {
  fetch(`${getEndpoint()}/track?carrier=${carrier}&trackingNumber=${trackingNumber}`)
    .then((res) => res.json())
    .then((data) => {
      console.log({ data });
      return data;
    });
};
