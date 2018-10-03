'use strict';

window.photoUploader = (function () {
  var main = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content;
  var errorMessageTemplate = document.querySelector('#error').content;
  // var loadingMessageTemplate = main.querySelector('#error').content;

  var photoUpload = document.querySelector('.img-upload');
  var photoUploadForm = photoUpload.querySelector('.img-upload__form');
  var photoUploadField = photoUpload.querySelector('#upload-file');

  photoUploadField.addEventListener('change', onPhotoUploadFieldChange);

  photoUploadForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(photoUploadForm), onSuccessUpload, onErrorUpload);
    evt.preventDefault();
  });

  function onSuccessUpload() {
    var node = successMessageTemplate.cloneNode(true);
    var btnOK = node.querySelector('.success__button');
    btnOK.addEventListener('click', function () {
      document.querySelector('main > .success').remove();
    });
    window.photoEditor.close();
    main.appendChild(node);
  }

  function onErrorUpload() {
    var node = errorMessageTemplate.cloneNode(true);
    var btnAgain = node.querySelector('.error__button--again');
    var btnNewLoad = node.querySelector('.error__button--new-load');
    btnAgain.addEventListener('click', function () {
      document.querySelector('main > .error').remove();
    });
    btnNewLoad.addEventListener('click', function () {
      window.photoEditor.close();
      document.querySelector('main > .error').remove();
    });

    main.appendChild(node);
    document.querySelector('main > .error').style.zIndex = 10;
  }

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
    photoUploadField.blur();
    window.photoEditor.open();
  }
})();
