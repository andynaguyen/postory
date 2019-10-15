import TrackingInfoStorage from '../storage';
import { DateTime } from 'luxon';

const storage = new TrackingInfoStorage();

const TrackingInfoListItem = (id, trackingInfo, onDelete) => {
  const li = document.createElement('li');
  li.className = 'container';
  li.style = 'padding-top: 3%; padding-left: 3%; padding-right: 3%;';
  li.id = id;

  const card = document.createElement('div');
  card.className = 'card';

  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';

  const cardHeaderTitle = document.createElement('p');
  cardHeaderTitle.className = 'card-header-title';
  cardHeaderTitle.innerText = trackingInfo.tracking_number;
  cardHeader.appendChild(cardHeaderTitle);

  const cardHeaderIcon = document.createElement('div');
  cardHeaderIcon.setAttribute('aria-label', 'delete');
  cardHeaderIcon.className = 'card-header-icon';

  const deleteIcon = document.createElement('button');
  deleteIcon.className = 'delete';
  deleteIcon.addEventListener('click', onDelete);
  cardHeaderIcon.appendChild(deleteIcon);
  cardHeader.appendChild(cardHeaderIcon);

  card.appendChild(cardHeader);

  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';
  const eta = DateTime.fromISO(trackingInfo.eta).toLocaleString(DateTime.DATETIME_MED);
  const status = trackingInfo.tracking_status.status;
  cardContent.innerHTML = `<p>CARRIER: ${trackingInfo.carrier}</p><p>ETA: ${eta}</p><p>STATUS: ${status}</p>`;
  card.appendChild(cardContent);

  li.appendChild(card);

  return li;
};

const PopupApp = (trackingInfos) => {
  const onDelete = (id) => () => {
    const toDelete = document.getElementById(id);
    storage.remove(id);
    document.querySelector('ul#tracking-info-list').removeChild(toDelete);
  };

  const render = () => {
    const ul = document.createElement('ul');
    ul.style = 'list-style: none; padding-bottom: 3%;';
    ul.id = 'tracking-info-list';
    trackingInfos.forEach((trackingInfo) => {
      const id = `${trackingInfo.carrier}#${trackingInfo.tracking_number}`;
      const li = TrackingInfoListItem(id, trackingInfo, onDelete(id));
      ul.appendChild(li);
    });
    return ul;
  };

  return render();
};

storage.getAll((trackingInfos) => {
  document.querySelector('div#app').appendChild(PopupApp(trackingInfos));
});
