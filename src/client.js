const request = (carrier, trackingNumber) => {
  return fetch(`${process.env.ENDPOINT}/track?carrier=${carrier}&trackingNumber=${trackingNumber}`).then((res) =>
    res.json(),
  );
};

export default { request };
