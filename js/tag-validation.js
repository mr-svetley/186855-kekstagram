'use strict';

window.tagValidation = (function () {
  var MAX_TAG_LENGHT = 20;
  var MAX_OF_TAGS = 5;
  var Error = {
    TOO_MUCH: 'Не больше пяти хэш-тегов',
    TOO_LONG: 'Хэш-тег не может быть длиннее 20 символов',
    TAG_REPEAT: 'Хэш-теги не должны повторяться (#tAg = #tag)',
    NO_TAG: 'Хэш-тег должен начинаться с # и не содержать других #',
    NONAME_TAG: 'После # должно быть имя тега'
  };

  var form = document.querySelector('#upload-select-image');
  var hashTagInput = form.querySelector('.text__hashtags');
  var descriptionInput = form.querySelector('.text__description');

  function onHashTagInputChange(evt) {
    validateHashTagInput(evt.target);
  }

  function onHashTagInputEscPress(evt) {
    window.utils.isEscEvent(evt, function (event) {
      event.stopPropagetion();
    });
  }

  function onDescriptionInputEscPress(evt) {
    window.utils.isEscEvent(evt, function (event) {
      event.stopPropagetion();
    });
  }

  function isContainIncorrectTag(tags) {
    return tags.some(function (currentTag) {
      return !(currentTag.startsWith('#')) || (currentTag.indexOf('#', 1) !== -1);
    });
  }

  function isContainTooLongTag(tags) {
    return tags.some(function (currentString) {
      return (currentString.length > MAX_TAG_LENGHT);
    });
  }

  function isContainRepeatTag(tags) {
    var obj = {};
    tags.forEach(function (currentTag) {
      obj[currentTag] = currentTag;
    });
    return (Object.keys(obj).length !== tags.length);
  }

  function isContainNoNameTag(tags) {
    return tags.some(function (currentTag) {
      return currentTag.startsWith('#') && (currentTag.length === 1);
    });
  }

  function validateHashTagInput(input) {
    var tags = input.value
      .split(' ')
      .filter(Boolean);
    input.value = tags.join(' ');
    tags = tags.map(function (current) {
      return current.toLowerCase();
    });
    input.valid = true;
    input.style.outline = '2px solid tomato';
    switch (true) {
      case (tags.length > MAX_OF_TAGS):
        input.setCustomValidity(Error.TOO_MUCH);
        break;
      case (isContainTooLongTag(tags)):
        input.setCustomValidity(Error.TOO_LONG);
        break;
      case (isContainNoNameTag(tags)):
        input.setCustomValidity(Error.NONAME_TAG);
        break;
      case (isContainIncorrectTag(tags)):
        input.setCustomValidity(Error.NO_TAG);
        break;
      case (isContainRepeatTag(tags)):
        input.setCustomValidity(Error.TAG_REPEAT);
        break;
      default:
        input.setCustomValidity('');
        input.style.outline = 'none';
    }
  }

  function setHandlers() {
    hashTagInput.addEventListener('keyup', onHashTagInputChange);
    hashTagInput.addEventListener('keydown', onHashTagInputEscPress);
    descriptionInput.addEventListener('keydown', onDescriptionInputEscPress);
  }

  function removeHandlers() {
    hashTagInput.removeEventListener('keyup', onHashTagInputChange);
    hashTagInput.removeEventListener('keydown', onHashTagInputEscPress);
    descriptionInput.removeEventListener('keydown', onDescriptionInputEscPress);
  }

  return {
    setHandlers: setHandlers,
    removeHandlers: removeHandlers
  };
})();

