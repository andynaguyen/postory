import { render } from 'lit-html';
import { trackingAlert, progressBar } from 'src/templates';
import { ImgFileByCarrier } from 'src/constants';

const onDismiss = () => {
  const el = document.getElementById('postory-tracking-alert');
  el.classList.add('slideOutRight');
  el.addEventListener('animationend', el.remove);
};

export default (carrier, trackingNumber, callback) => {
  const onConfirm = () => {
    render(progressBar(), document.getElementById('postory-progress-bar'));
    callback().then(onDismiss);
  };

  setTimeout(() => {
    const carrierImgSrc = chrome.runtime.getURL(ImgFileByCarrier[carrier]);
    const trackingAlertDiv = document.createElement('div');
    trackingAlertDiv.id = 'postory-tracking-alert';
    trackingAlertDiv.classList.add('animated', 'slideInRight');
    document.body.appendChild(trackingAlertDiv);

    render(
      trackingAlert({ carrierImgSrc, carrierImgAlt: carrier, trackingNumber, onDismiss, onConfirm }),
      trackingAlertDiv,
    );
  }, 2500);
};
