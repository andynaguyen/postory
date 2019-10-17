import { DateTime } from 'luxon';

export const TrackingInfoList = (trackingInfos) =>
  `
    <ul id="tracking-info-list" style="list-style: none;padding-bottom: 3%">
      ${trackingInfos.map((trackingInfo) => TrackingInfoListItem(trackingInfo)).join('')}
    </ul>
  `;

const TrackingInfoListItem = (trackingInfo) =>
  `
    <li id="${`${trackingInfo.carrier}#${trackingInfo.tracking_number}`}" class="container tracking-info" style="padding-top:3%;padding-left:3%;padding-right:3%;">
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">${trackingInfo.tracking_number}</p>
          <div class="card-header-icon" aria-label="delete">
            <button class="delete"/>
          </div>
        </div>
        <div class="card-content">
          <p>CARRIER: ${trackingInfo.carrier}</p>
          <p>ETA: ${DateTime.fromISO(trackingInfo.eta).toLocaleString(DateTime.DATETIME_MED)}</p>
          <p>STATUS: ${trackingInfo.tracking_status.status}</p>
        </div>
      </div>
    </li>
  `;
