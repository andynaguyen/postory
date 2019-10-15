export default class {
  constructor(sync = true) {
    this.storageArea = sync ? chrome.storage.sync : chrome.storage.local;
  }

  add(trackingInfo) {
    const key = `${trackingInfo.carrier}#${trackingInfo.tracking_number}`;
    this.storageArea.set({ [key]: trackingInfo });
  }

  get(key, callback) {
    this.storageArea.get(key, (result) => callback(result));
  }

  getAll(callback) {
    this.storageArea.get(null, (result) => {
      const entries = Object.values(result || {});
      callback(entries);
    });
  }

  remove(key) {
    this.storageArea.remove(key);
  }

  update() {}
}
