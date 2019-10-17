import TrackingInfoStorage from '../storage';
import { TrackingInfoList } from './templates';

const storage = new TrackingInfoStorage();

const onDeleteTrackingInfo = (li) => {
  storage.remove(li.id);
  document.querySelector('ul#tracking-info-list').removeChild(li);
};

storage.getAll((trackingInfos) => {
  document.querySelector('div#app').innerHTML = TrackingInfoList(trackingInfos);
  document
    .querySelectorAll('li.tracking-info')
    .forEach((li) => li.querySelector('button.delete').addEventListener('click', () => onDeleteTrackingInfo(li)));
});
