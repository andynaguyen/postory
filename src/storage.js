export default class {
  constructor(sync = true) {
    this.storageArea = sync ? chrome.storage.sync : chrome.storage.local;
  }

  put(trackingInfo) {
    const key = `${trackingInfo.carrier}#${trackingInfo.tracking_number}`;
    this.storageArea.set({ [key]: trackingInfo }, this.dispatchMessage);
  }

  get(key, callback) {
    this.storageArea.get(key, (result) => callback(result));
  }

  list(callback) {
    this.storageArea.get(null, (result) => {
      const entries = Object.values(result || {});
      callback(entries);
    });
  }

  remove(key) {
    this.storageArea.remove(key);
  }

  dispatchMessage() {
    chrome.runtime.sendMessage({
      isStorageStale: true,
    });
  }
}
