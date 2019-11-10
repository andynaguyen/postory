import { render } from 'lit-html';
import { progressBar, trackingAlertContainer } from 'src/contentscripts/templates';

const onDismiss = () => {
  const el = document.getElementById('postory-tracking-alert-container');
  el.classList.add('slideOutRight');
  el.addEventListener('animationend', el.remove);
};

export default (carrier, trackingNumber, callback) => {
  const onConfirm = (displayName) => {
    render(progressBar('primary'), document.getElementById('postory-progress-bar'));
    callback(displayName)
      .then(onDismiss)
      .catch((err) => {
        console.error('failed to add tracking info: ', err);
        render(progressBar('danger'), document.getElementById('postory-progress-bar'));
        setTimeout(onDismiss, 2500);
      });
  };

  window.onmessage = (request) => {
    if (request.data.trackingAlert) {
      const { action, displayName } = request.data.trackingAlert;
      switch (action) {
        case 'dismiss':
          onDismiss();
          break;
        case 'confirm':
          onConfirm(displayName);
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
