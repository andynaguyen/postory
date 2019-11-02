import { render } from 'lit-html';
import { trackingAlert } from 'src/templates';
import { ImgFileByCarrier } from 'src/constants';

const params = new URLSearchParams(window.location.search);
const carrier = params.get('carrier');
const trackingNumber = params.get('trackingNumber');

const onDismiss = () => {
  window.parent.postMessage(
    {
      trackingAlert: {
        action: 'dismiss',
      },
    },
    '*',
  );
};

const onConfirm = () => {
  window.parent.postMessage(
    {
      trackingAlert: {
        action: 'confirm',
        displayName: document.getElementById('display-name-input').value,
      },
    },
    '*',
  );
};

const trackingAlertDiv = document.getElementById('postory-tracking-alert-content');
const carrierImgSrc = chrome.runtime.getURL(ImgFileByCarrier[carrier]);
render(
  trackingAlert({ carrierImgSrc, carrierImgAlt: carrier, trackingNumber, onDismiss, onConfirm }),
  trackingAlertDiv,
);
