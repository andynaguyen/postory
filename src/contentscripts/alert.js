import { render } from 'lit-html';
import { progressBar, trackingAlertContainer } from 'src/templates';

const onDismiss = () => {
  const el = document.getElementById('postory-tracking-alert-container');
  el.classList.add('slideOutRight');
  el.addEventListener('animationend', el.remove);
};

export default (carrier, trackingNumber, callback) => {
  const onConfirm = (displayName) => {
    render(progressBar(), document.getElementById('postory-progress-bar'));
    callback(displayName).then(onDismiss);
  };

  window.onmessage = (request) => {
    if (request.data.trackingAlert) {
      switch (request.data.trackingAlert.action) {
        case 'dismiss':
          onDismiss();
          break;
        case 'confirm':
          onConfirm(request.data.trackingAlert.displayName);
          break;
      }
    }
  };

  setTimeout(() => {
    const iframe = document.createElement('div');
    iframe.id = 'postory-tracking-alert-container';
    iframe.classList.add('animated', 'slideInRight');
    document.body.appendChild(iframe);
    render(trackingAlertContainer({ carrier, trackingNumber }), iframe);
  }, 2500);
};
