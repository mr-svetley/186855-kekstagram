'use strict';

window.utils = (function () {
  var ESC_KEYCODE = 27;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    generateRandomInteger: function (max, min) {
      min = min || 0;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    generateArrayWithRandonUniqueInteger: function (lenght, max, min) {
      var uniqueIds = [];
      var randonId;
      var duplicate;

      if (!min) {
        min = 0;
      }

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
  };
})();

