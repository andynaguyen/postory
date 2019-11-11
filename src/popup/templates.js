import { DateTime } from 'luxon';
import { html } from 'lit-html';
import { ImgFileByCarrier } from 'src/constants';
import { openCarrierTab } from 'src/tab';
import util from 'src/util';

const BadgeInfoByTrackingStatus = {
  DELIVERED: {
    text: 'Delivered',
    className: 'is-primary',
  },
  PRE_TRANSIT: {
    text: 'Pre-transit',
    className: 'is-info',
  },
  TRANSIT: {
    text: 'Transit',
    className: 'is-info',
  },
  RETURNED: {
    text: 'Returned',
    className: 'is-danger',
  },
  FAILURE: {
    text: 'Failure',
    className: 'is-danger',
  },
  UNKNOWN: {
    text: 'Unknown',
    className: 'is-light',
  },
};

const trackingInfoStatusBadge = (trackingInfoStatus) => {
  const { text, className } = BadgeInfoByTrackingStatus[trackingInfoStatus] || BadgeInfoByTrackingStatus.UNKNOWN;
  return html`
    <div class="tags has-addons">
      <span class="tag">Status</span>
      <span class="tag ${className}">${text}</span>
    </div>
  `;
};

const trackingInfoCardContent = (trackingInfo) =>
  html`
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="${ImgFileByCarrier[trackingInfo.carrier]}" alt="${trackingInfo.carrier}" />
          </figure>
        </div>
        <div class="media-content tracking-info-media-content">
          <div class="tags has-addons">
            <span class="tag">ETA</span>
            <span class="tag is-info">${util.formatDateTime(DateTime.fromISO(trackingInfo.eta))}</span>
          </div>
          ${trackingInfoStatusBadge(trackingInfo.tracking_status.status)}
        </div>
      </div>
    </div>
  `;

const trackingInfoListItem = (trackingInfo, onDeleteTrackingInfo) => {
  const id = `${trackingInfo.carrier}#${trackingInfo.tracking_number}`;
  return html`
    <li id="${id}" class="container tracking-info">
      <div class="card tracking-info-card">
        <header class="card-header">
          <p class="card-header-title with-pointer" @click=${() => openCarrierTab(trackingInfo)}>
            ${trackingInfo.displayName || trackingInfo.tracking_number}
          </p>
          <div class="card-header-icon no-pointer">
            <button class="card-header-icon delete" aria-label="delete" @click=${() => onDeleteTrackingInfo(id)} />
          </div>
        </header>
        ${trackingInfoCardContent(trackingInfo)}
      </div>
    </li>
  `;
};

export const trackingInfoList = (trackingInfos, onDeleteTrackingInfo) =>
  html`
    <ul id="tracking-info-list">
      ${trackingInfos.length
        ? trackingInfos.map((trackingInfo) => trackingInfoListItem(trackingInfo, onDeleteTrackingInfo))
        : html`
            <i>Nothing added to Postory yet. Navigate to a tracking page to track the shipment!</i>
          `}
    </ul>
  `;
