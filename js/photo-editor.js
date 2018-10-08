'use strict';

window.photoEditor = (function () {
  var photoEditorForm = document.querySelector('.img-upload__form');
  var photoEditor = photoEditorForm.querySelector('.img-upload__overlay');
  var photoEditorCancel = photoEditor.querySelector('.img-upload__cancel');

  function openPhotoEditor() {
    photoEditorCancel.addEventListener('click', onPhotoEditorCancelClick);
    document.addEventListener('keydown', onPhotoEditorEscPress);

    window.zoom.setHandlers();
    window.zoom.reset();

    window.effect.setHandlers();
    window.effect.reset();

    window.tagValidation.setHandlers();

    photoEditor.classList.remove('hidden');
  }

  function onPhotoEditorCancelClick() {
    closePhotoEditor();
  }

  function onPhotoEditorEscPress(evt) {
    if (window.photoUploader.modalStatus() === 'closed') {
      window.utils.isEscEvent(evt, closePhotoEditor);
    }
  }

  function closePhotoEditor() {
    photoEditor.classList.add('hidden');
    photoEditorCancel.removeEventListener('click', onPhotoEditorCancelClick);
    document.removeEventListener('keydown', onPhotoEditorEscPress);

    window.zoom.removeHandlers();
    window.effect.removeHandlers();
    window.tagValidation.removeHandlers();

    photoEditorForm.reset();

    resetPhotoEditor();
  }

  function resetPhotoEditor() {
    photoEditor.querySelector('.img-upload__preview img').className = '';
  }

  return {
    open: openPhotoEditor,
    close: closePhotoEditor
  };
})();

