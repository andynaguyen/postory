import { DateTime } from 'luxon';
import { ImgFileByCarrier } from 'src/constants';
import util from 'src/util';

const TrackingInfoListItem = (trackingInfo) =>
  `
    <li id="${`${trackingInfo.carrier}#${trackingInfo.tracking_number}`}" class="container tracking-info" >
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">${trackingInfo.tracking_number}</p>
          <div class="card-header-icon no-cursor">
            <button class="card-header-icon delete aria-label="delete""/>
          </div>
        </header>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="${ImgFileByCarrier[trackingInfo.carrier]}" alt="${trackingInfo.carrier}"/>
              </figure>
            </div>
            <div class="media-content tracking-info-media-content" >
              <p>ETA: ${util.formatDateTime(DateTime.fromISO(trackingInfo.eta))}</p>
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

const Notification = () =>
  `
    <div class="card">
      <header class="card-header">
        Add to Postory?
      </header>
      <div class="card-content">
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
      </footer>
    </div>
  `;
