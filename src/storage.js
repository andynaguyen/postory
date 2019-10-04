export default class TrackingInfoStorage {
  constructor(sync = true) {
    this.storeKey = 'PostoryTrackingInfo';
    this.storageArea = sync ? chrome.storage.sync : chrome.storage.local;
  }

  add(key, trackingInfo) {
    this.storageArea.get([this.storeKey], (result) => {
      console.log('old', result);
      const updated = { ...result[this.storeKey], ...{ [key]: trackingInfo } };
      console.log('updated', updated);
      this.storageArea.set({ [this.storeKey]: updated });
    });
  }

  get() {}

  list() {}

  remove() {}

  update() {}
}
