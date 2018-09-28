'use strict';

window.app.photoEditor = (function () {
  var photoEditorForm = document.querySelector('.img-upload__form');
  var photoEditor = photoEditorForm.querySelector('.img-upload__overlay');
  var photoEditorCancel = photoEditor.querySelector('.img-upload__cancel');

  function openPhotoEditor() {
    photoEditorCancel.addEventListener('click', onPhotoEditorCancelClick);
    document.addEventListener('keydown', onPhotoEditorEscPress);
    window.app.zoom.init();
    window.app.effect.init();
    window.app.tagValidation.init();
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
    window.app.zoom.destruct();
    window.app.effect.destruct();
    window.app.tagValidation.destruct();
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
