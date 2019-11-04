import { html } from 'lit-html';

export const progressBar = () =>
  html`
    <progress class="postory-progress is-small is-primary" max="100">15%</progress>
  `;

export const trackingAlertContainer = ({ carrier, trackingNumber }) =>
  html`
    <iframe
      src="${chrome.runtime.getURL('iframe.html')}?carrier=${carrier}&trackingNumber=${trackingNumber}"
      id="postory-tracking-alert-iframe"
    ></iframe>
    <div id="postory-progress-bar"></div>
  `;

export const trackingAlert = ({ trackingNumber, carrierImgSrc, carrierImgAlt, onDismiss, onConfirm }) =>
  html`
    <div class="card animated fadeIn">
      <header class="card-header">
        <p class="card-header-title">
          Track shipment using Postory?
        </p>
      </header>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src=${carrierImgSrc} alt=${carrierImgAlt} />
            </figure>
          </div>
          <div class="media-content">
            <input id="display-name-input" class="input" type="text" placeholder="Display name (optional)" />
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item" @click=${onDismiss}>Not Now</a>
        <a href="#" class="card-footer-item" @click=${onConfirm}>OK</a>
      </footer>
    </div>
  `;
