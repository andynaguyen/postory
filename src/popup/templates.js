import { DateTime } from 'luxon';

const ImgFileByCarrier = {
  fedex: 'images/fedex.webp',
  dhl_express: 'images/dhl.webp',
  ups: 'images/ups.webp',
  usps: 'images/usps.png',
};

const TrackingInfoListItem = (trackingInfo) =>
  `
    <li id="${`${trackingInfo.carrier}#${trackingInfo.tracking_number}`}" class="container tracking-info" >
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">${trackingInfo.tracking_number}</p>
          <div class="card-header-icon no-cursor">
            <button class="card-header-icon delete aria-label="delete""/>
          </div>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="${ImgFileByCarrier[trackingInfo.carrier]}" alt="${trackingInfo.carrier}"/>
              </figure>
            </div>
            <div class="media-content tracking-info-media-content" >
              <p>ETA: ${DateTime.fromISO(trackingInfo.eta).toLocaleString(DateTime.DATETIME_MED)}</p>
              <p>STATUS: ${trackingInfo.tracking_status.status}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  `;

export const TrackingInfoList = (trackingInfos) =>
  `
    <ul id="tracking-info-list">
      ${trackingInfos.map((trackingInfo) => TrackingInfoListItem(trackingInfo)).join('')}
    </ul>
  `;
