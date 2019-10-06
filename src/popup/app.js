import TrackingInfoStorage from '../storage';

const storage = new TrackingInfoStorage();

const TrackingInfoListItem = (id, trackingInfo, onDelete) => {
  const li = document.createElement('li');
  li.id = id;

  const innerDiv = document.createElement('div');
  innerDiv.innerText = JSON.stringify(trackingInfo);
  li.appendChild(innerDiv);

  const btn = document.createElement('button');
  btn.innerText = 'Delete';
  btn.addEventListener('click', onDelete);
  li.appendChild(btn);

  return li;
};

const PopupApp = (trackingInfoIdPairs) => {
  const onDelete = (id) => () => {
    const toDelete = document.getElementById(id);
    storage.remove(id);
    document.querySelector('ul#tracking-info-list').removeChild(toDelete);
  };

  const render = () => {
    const ul = document.createElement('ul');
    ul.id = 'tracking-info-list';
    trackingInfoIdPairs.forEach(([id, trackingInfo]) => {
      const li = TrackingInfoListItem(id, trackingInfo, onDelete(id));
      ul.appendChild(li);
    });
    return ul;
  };

  return render();
};

storage.getAll((result) => {
  console.log('result', result);
  document.querySelector('div#container').appendChild(PopupApp(result));
});
