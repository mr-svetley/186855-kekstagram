'use strict';

window.utils = (function () {
  var ESC_KEYCODE = 27;
  var lastTimeout;

  function isEscEvent(evt, cb) {
    if (evt.keyCode === ESC_KEYCODE) {
      cb(evt);
    }
  }

  function generateRandomInteger(max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateArrayWithRandonUniqueInteger(lenght, max, min) {
    var uniqueIds = [];
    var randonId;
    var duplicate;
    min = min || 0;

    while (uniqueIds.length !== lenght) {
      randonId = window.utils.generateRandomInteger(min, max);
      duplicate = uniqueIds.some(function (element) {
        return randonId === element;
      });

      if (!duplicate) {
        uniqueIds.push(randonId);
      }
    }
    return uniqueIds;
  }

  function setNoDebounce(interval, cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, interval);
  }

  return {
    isEscEvent: isEscEvent,
    generateRandomInteger: generateRandomInteger,
    generateArrayWithRandonUniqueInteger: generateArrayWithRandonUniqueInteger,
    setNoDebounce: setNoDebounce
  };
})();

