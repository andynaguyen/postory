import swal from 'sweetalert';

export default (callback) => {
  setTimeout(() => {
    swal('Do you want to track this package with Postory?', {
      buttons: {
        cancel: true,
        ok: 'OK',
      },
    }).then((value) => {
      if (value === 'ok') {
        callback();
        swal('Added.');
      }
    });
  }, 2500);
};
