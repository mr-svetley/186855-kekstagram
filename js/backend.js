'use strict';

window.backend = (function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var Error = {
    NOT_FOUND: 404,
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401
  };
  var photoData = [];

  function upload(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  }

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL_LOAD);
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Error.OK:
          photoData = xhr.response;
          onLoad(xhr.response);
          break;

        case Error.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case Error.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case Error.NOT_FOUND:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.send();
  }

  return {
    getData: function (photoId) {
      return photoId ? photoData[photoId] : photoData;
    },
    upload: upload,
    load: load
  };
})();
