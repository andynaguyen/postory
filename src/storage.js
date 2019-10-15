export default class {
  constructor(sync = true) {
    this.storeKey = 'PostoryTrackingInfo';
    this.storageArea = sync ? chrome.storage.sync : chrome.storage.local;
  }

  add(trackingInfo) {
    const key = `${trackingInfo.carrier}#${trackingInfo.tracking_number}`;
    this.storageArea.get(this.storeKey, (result) => {
      const updated = { ...result[this.storeKey], ...{ [key]: trackingInfo } };
      this.storageArea.set({ [this.storeKey]: updated });
    });
  }

  get(key, callback) {
    this.storageArea.get(this.storeKey, (result) => callback(result[this.storeKey][key]));
  }

  getAll(callback) {
    this.storageArea.get(this.storeKey, (result) => {
      const entries = Object.values(result[this.storeKey] || {});
      callback(entries);
    });
  }

  remove(key) {
    this.storageArea.get(this.storeKey, (result) => {
      const updated = { ...result[this.storeKey] };
      delete updated[key];
      this.storageArea.set({ [this.storeKey]: updated });
    });
  }

  update() {}
}
