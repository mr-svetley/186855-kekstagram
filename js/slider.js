'use strict';

window.slider = (function () {
  var VALUE_MIN = 0;
  var VALUE_MAX = 100;
  var VALUE_DEFAULT = 100;

  var photoEditor = document.querySelector('.img-upload__overlay');
  var slider = photoEditor.querySelector('.img-upload__effect-level');
  var sliderPin = slider.querySelector('.effect-level__pin');
  var sliderInput = slider.querySelector('.effect-level__value');
  var slederScale = slider.querySelector('.effect-level__line');
  var sliderDepth = slider.querySelector('.effect-level__depth');

  function onSliderPinMouseDown(downEvt) {
    var scaleLineRect = slederScale.getBoundingClientRect();
    var scaleLineX1 = scaleLineRect.left;
    var scaleLineX2 = scaleLineRect.right;
    var scaleLineWidth = scaleLineX2 - scaleLineX1;
    var onePercent = scaleLineWidth / 100;

    downEvt.preventDefault();
    var startX = downEvt.clientX;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.clientX >= scaleLineX1 && moveEvt.clientX <= scaleLineX2) {
        var shift = startX - moveEvt.clientX;
        startX = moveEvt.clientX;
        var value = (sliderPin.offsetLeft - shift) / onePercent;
      }

      if (moveEvt.clientX > scaleLineX2 || value > VALUE_MAX) {
        value = VALUE_MAX;
      } else if (moveEvt.clientX < scaleLineX1 || value < VALUE_MIN) {
        value = VALUE_MIN;
      }

      applyValue(value);
      window.effect.applyEffect(window.effect.getCurrent(), value);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function applyValue(value) {
    value = Math.round(value);
    sliderPin.style.left = value + '%';
    sliderDepth.style.width = value + '%';
    sliderInput.value = value;
  }

  return {
    setHandlers: function () {
      sliderPin.addEventListener('mousedown', onSliderPinMouseDown);
    },
    removeHandlers: function () {
      sliderPin.removeEventListener('mousedown', onSliderPinMouseDown);
    },
    reset: function () {
      applyValue(VALUE_DEFAULT);
      window.effect.applyEffect(window.effect.getCurrent(), VALUE_DEFAULT);
    },
    hide: function (flag) {
      slider.classList.toggle('hidden', flag);
      if (flag) {
        window.slider.removeHandlers();
      } else {
        window.slider.setHandlers();
      }
    }
  };
})();
