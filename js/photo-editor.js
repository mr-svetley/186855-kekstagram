'use strict';

window.app.photoEditor = (function () {
  var photoEditorForm = document.querySelector('.img-upload__form');
  var photoEditor = photoEditorForm.querySelector('.img-upload__overlay');
  var photoEditorCancel = photoEditor.querySelector('.img-upload__cancel');

  function openPhotoEditor() {
    photoEditorCancel.addEventListener('click', onPhotoEditorCancelClick);
    document.addEventListener('keydown', onPhotoEditorEscPress);

    window.app.zoom.setHandlers();
    window.app.zoom.reset();

    window.app.effect.setHandlers();
    window.app.effect.reset();

    window.app.tagValidation.setHandlers();

    photoEditor.classList.remove('hidden');
  }

  function onPhotoEditorCancelClick() {
    closePhotoEditor();
  }

  function onPhotoEditorEscPress(evt) {
    window.app.utils.isEscEvent(evt, closePhotoEditor);
  }

  function closePhotoEditor() {
    photoEditor.classList.add('hidden');
    photoEditorCancel.removeEventListener('click', onPhotoEditorCancelClick);
    document.removeEventListener('keydown', onPhotoEditorEscPress);

    window.app.zoom.removeHandlers();
    window.app.effect.removeHandlers();
    window.app.tagValidation.removeHandlers();

    photoEditorForm.reset();

    resetPhotoEditor();
  }

  function resetPhotoEditor() {
    photoEditor.querySelector('.img-upload__preview img').className = '';
  }

  return {
    open: openPhotoEditor
  };
})();

