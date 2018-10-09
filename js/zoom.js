'use strict';

window.zoom = (function () {
  var ZOOM_MIN = 25;
  var ZOOM_MAX = 100;
  var ZOOM_STEP = 25;
  var ZOOM_DEFAULT = 100;

  var photoEditor = document.querySelector('.img-upload__overlay');
  var zoomMin = photoEditor.querySelector('.scale__control--smaller');
  var zoomPlus = photoEditor.querySelector('.scale__control--bigger');
  var zoomInput = photoEditor.querySelector('.scale__control--value');
  var editorImage = photoEditor.querySelector('.img-upload__preview');

  function zoomPhoto(step) {
    var currentZoomValue = parseInt(zoomInput.value, 10);
    var newZoomValue = currentZoomValue + step;

    newZoomValue = Math.max(Math.min(newZoomValue, ZOOM_MAX), ZOOM_MIN);

    zoomInput.value = newZoomValue + '%';
    editorImage.style.transform = 'scale(' + (newZoomValue / 100) + ')';
  }

  function onZoomMinClick() {
    zoomPhoto(-ZOOM_STEP);
  }

  function onZoomPlusClick() {
    zoomPhoto(ZOOM_STEP);
  }

  function setHandlers() {
    zoomMin.addEventListener('click', onZoomMinClick);
    zoomPlus.addEventListener('click', onZoomPlusClick);
  }

  function reset() {
    zoomInput.value = ZOOM_DEFAULT + '%';
    editorImage.style.transform = 'scale(' + (ZOOM_DEFAULT / 100) + ')';
  }

  function removeHandlers() {
    zoomMin.removeEventListener('click', onZoomMinClick);
    zoomPlus.removeEventListener('click', onZoomPlusClick);
  }

  return {
    setHandlers: setHandlers,
    reset: reset,
    removeHandlers: removeHandlers
  };
})();
