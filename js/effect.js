'use strict';

window.app.effect = (function () {
  var MAX_BLUR_VALUE = 3;
  var MAX_BRIGHTNESS_VALUE = 3;
  var DEFAULT_EFFECT_VALUE = 100;
  var DEFAULT_EFFECT_NAME = 'none';

  var photoEditor = document.querySelector('.img-upload__overlay');
  var editorImage = photoEditor.querySelector('.img-upload__preview img');
  var effectInputContainer = photoEditor.querySelector('.img-upload__effects');

  var currentEffectName;

  function applyEffect(effectName, value) {
    editorImage.removeAttribute('class');
    editorImage.removeAttribute('style');
    editorImage.classList.add('effects__preview--' + effectName);
    currentEffectName = effectName;
    if (effectName === 'none') {
      window.app.slider.hide(true);
    } else {
      window.app.slider.hide(false);
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
      window.app.slider.reset();
    }
  }

  return {
    init: function () {
      effectInputContainer.addEventListener('click', onEffectInputClick);
      applyEffect(DEFAULT_EFFECT_NAME, DEFAULT_EFFECT_VALUE);
      window.app.slider.init(applyEffect);
    },
    destruct: function () {
      effectInputContainer.removeEventListener('click', onEffectInputClick);
    },
    getCurrentEffect: function () {
      return currentEffectName;
    }
  };
})();
