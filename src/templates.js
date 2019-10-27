import { DateTime } from 'luxon';
import { html } from 'lit-html';
import { ImgFileByCarrier } from 'src/constants';
import util from 'src/util';

const trackingInfoListItem = (trackingInfo, onDeleteTrackingInfo) => {
  const id = `${trackingInfo.carrier}#${trackingInfo.tracking_number}`;
  return html`
    <li id="${id}" class="container tracking-info">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">${trackingInfo.tracking_number}</p>
          <div class="card-header-icon no-cursor">
            <button class="card-header-icon delete" aria-label="delete" @click=${() => onDeleteTrackingInfo(id)} />
          </div>
        </header>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="${ImgFileByCarrier[trackingInfo.carrier]}" alt="${trackingInfo.carrier}" />
              </figure>
            </div>
            <div class="media-content tracking-info-media-content">
              <p>ETA: ${util.formatDateTime(DateTime.fromISO(trackingInfo.eta))}</p>
              <p>STATUS: ${trackingInfo.tracking_status.status}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  `;
};

export const trackingInfoList = (trackingInfos, onDeleteTrackingInfo) =>
  html`
    <ul id="tracking-info-list">
      ${trackingInfos.map((trackingInfo) => trackingInfoListItem(trackingInfo, onDeleteTrackingInfo))}
    </ul>
  `;

export const progressBar = () =>
  html`
    <progress class="progress is-small is-primary" max="100">15%</progress>
  `;

export const trackingAlert = ({ trackingNumber, carrierImgSrc, carrierImgAlt, onDismiss, onConfirm }) =>
  html`
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Track package using Postory?
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
            <p class="level">${trackingNumber}</p>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="javascript:void(0);" class="card-footer-item" @click=${onDismiss}>Not Now</a>
        <a href="javascript:void(0);" class="card-footer-item" @click=${onConfirm}>OK</a>
      </footer>
    </div>
    <div id="postory-progress-bar"></div>
  `;
