'use strict';

window.app.photoUploader = (function () {
  var photoUpload = document.querySelector('.img-upload');
  var photoUploadField = photoUpload.querySelector('#upload-file');

  photoUploadField.addEventListener('change', onPhotoUploadFieldChange);

  function onPhotoUploadFieldChange() {
    // var preview = photoUpload.querySelector('.img-upload__preview img');
    // var file = photoUploadField.files[0];
    // var reader = new FileReader();

    // reader.onloadend = function () {
    //   preview.src = reader.result;
    // };

    // if (file) {
    //   reader.readAsDataURL(file);
    // } else {
    //   preview.src = '';
    // }

    window.app.photoEditor.open();
  }
})();
