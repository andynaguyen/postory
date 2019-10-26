import { render } from 'lit-html';
import TrackingInfoStorage from 'src/storage';
import { trackingInfoList } from 'src/templates';

const storage = new TrackingInfoStorage();

const onDeleteTrackingInfo = (id) => {
  storage.remove(id);
  document.getElementById(`${id}`).remove();
};

storage.list((trackingInfos) => {
  render(trackingInfoList(trackingInfos, onDeleteTrackingInfo), document.querySelector('div#app'));
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.isStorageStale) {
    storage.list((trackingInfos) => {
      render(trackingInfoList(trackingInfos, onDeleteTrackingInfo), document.querySelector('div#app'));
    });
  }
});
