'use strict';

window.photoUploader = (function () {
  var main = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content;
  var errorMessageTemplate = document.querySelector('#error').content;

  var photoUpload = document.querySelector('.img-upload');
  var photoUploadForm = photoUpload.querySelector('.img-upload__form');
  var photoUploadField = photoUpload.querySelector('#upload-file');

  var modalStatus = 'closed';

  photoUploadField.addEventListener('change', onPhotoUploadFieldChange);

  photoUploadForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(photoUploadForm), onSuccessUpload, onErrorUpload);
    evt.preventDefault();
  });

  function addGlobalHendlers() {
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', onDocumentClick);
  }

  function removeGlobalHendlers() {
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', onDocumentClick);
  }

  function closeMessage() {
    var successMessage = document.querySelector('main > .success');
    if (successMessage) {
      successMessage.remove();
    }
    var errorMessage = document.querySelector('main > .error');
    if (errorMessage) {
      errorMessage.remove();
    }
    removeGlobalHendlers();
    modalStatus = 'closed';
  }

  function onDocumentEscPress() {
    closeMessage();
  }

  function onDocumentClick() {
    closeMessage();
  }

  function onSuccessUpload() {
    var node = successMessageTemplate.cloneNode(true);
    var btnOK = node.querySelector('.success__button');
    btnOK.addEventListener('click', function () {
      closeMessage();
    });
    window.photoEditor.close();
    main.appendChild(node);
    addGlobalHendlers();
    modalStatus = 'open';
  }

  function onErrorUpload() {
    var node = errorMessageTemplate.cloneNode(true);
    var btnAgain = node.querySelector('.error__button--again');
    var btnNewLoad = node.querySelector('.error__button--new-load');
    btnAgain.addEventListener('click', function () {
      closeMessage();
    });
    btnNewLoad.addEventListener('click', function () {
      window.photoEditor.close();
      closeMessage();
    });

    main.appendChild(node);
    addGlobalHendlers();
    modalStatus = 'open';
    document.querySelector('main > .error').style.zIndex = 10;
  }

  function onPhotoUploadFieldChange() {
    var preview = photoUpload.querySelector('.img-upload__preview img');
    var file = photoUploadField.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
    photoUploadField.blur();
    window.photoEditor.open();
  }

  return {
    modalStatus: function () {
      return modalStatus;
    }
  };
})();
