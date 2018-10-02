'use strict';

window.backend = (function () {
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
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
        case 200:
          photoData = xhr.response;
          onLoad(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
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
