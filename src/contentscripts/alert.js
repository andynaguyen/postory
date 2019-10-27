import { render } from 'lit-html';
import { trackingAlert, progressBar } from 'src/templates';
import { ImgFileByCarrier } from 'src/constants';

const onDismiss = () => document.getElementById('postory-tracking-alert').remove();

export default (carrier, trackingNumber, callback) => {
  const onConfirm = () => {
    render(progressBar(), document.getElementById('postory-progress-bar'));
    callback().then(onDismiss);
  };

  setTimeout(() => {
    const carrierImgSrc = chrome.runtime.getURL(ImgFileByCarrier[carrier]);
    const trackingAlertDiv = document.createElement('div');
    trackingAlertDiv.id = 'postory-tracking-alert';
    document.body.appendChild(trackingAlertDiv);

    render(
      trackingAlert({ carrierImgSrc, carrierImgAlt: carrier, trackingNumber, onDismiss, onConfirm }),
      trackingAlertDiv,
    );
  }, 2500);
};
