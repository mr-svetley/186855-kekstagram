'use strict';

window.effect = (function () {
  var MAX_BLUR_VALUE = 3;
  var MAX_BRIGHTNESS_VALUE = 3;
  var DEFAULT_EFFECT_VALUE = 100;
  var DEFAULT_EFFECT_NAME = 'none';

  var photoEditor = document.querySelector('.img-upload__overlay');
  var editorImage = photoEditor.querySelector('.img-upload__preview img');
  var effectInputContainer = photoEditor.querySelector('.img-upload__effects');

  var currentEffectName;

  function applyEffect(effectName, value) {
    editorImage.classList.remove('effects__preview--' + currentEffectName);
    editorImage.removeAttribute('style');
    editorImage.classList.add('effects__preview--' + effectName);
    currentEffectName = effectName;
    if (effectName === 'none') {
      window.slider.hide(true);
    } else {
      window.slider.hide(false);
    }

    if (value || value === 0) {
      switch (effectName) {
        case 'chrome':
          value /= 100;
          editorImage.style.filter = 'grayscale(' + value + ')';
          break;
        case 'sepia':
          value /= 100;
          editorImage.style.filter = 'sepia(' + value + ')';
          break;
        case 'marvin':
          editorImage.style.filter = 'invert(' + value + '%)';
          break;
        case 'phobos':
          value = value * MAX_BLUR_VALUE / 100;
          editorImage.style.filter = 'blur(' + value + 'px)';
          break;
        case 'heat':
          value = value * MAX_BRIGHTNESS_VALUE / 100;
          editorImage.style.filter = 'brightness(' + value + ')';
          break;
        case 'none':
          break;
        default:
          throw new TypeError('Invalid "effectName" argument: ' + effectName);
      }
    }
  }

  function onEffectInputClick(evt) {
    var target = evt.target.closest('.effects__radio');
    if (target) {
      var effectName = target.value;
      applyEffect(effectName);
      window.slider.reset();
    }
  }

  return {
    setHandlers: function () {
      effectInputContainer.addEventListener('click', onEffectInputClick);
      window.slider.setHandlers();
    },
    removeHandlers: function () {
      effectInputContainer.removeEventListener('click', onEffectInputClick);
      window.slider.removeHandlers();
    },
    reset: function () {
      applyEffect(DEFAULT_EFFECT_NAME, DEFAULT_EFFECT_VALUE);
      window.slider.reset();
    },
    getCurrent: function () {
      return currentEffectName;
    },
    applyEffect: applyEffect
  };
})();
