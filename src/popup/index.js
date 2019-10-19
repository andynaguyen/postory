import TrackingInfoStorage from 'src/storage';
import { TrackingInfoList } from 'src/templates';

const storage = new TrackingInfoStorage();

const onDeleteTrackingInfo = (li) => {
  storage.remove(li.id);
  document.querySelector('ul#tracking-info-list').removeChild(li);
};

storage.list((trackingInfos) => {
  document.querySelector('div#app').innerHTML = TrackingInfoList(trackingInfos);
  document
    .querySelectorAll('li.tracking-info')
    .forEach((li) => li.querySelector('button.delete').addEventListener('click', () => onDeleteTrackingInfo(li)));
});
