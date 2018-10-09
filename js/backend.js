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

  function createXHR(method, url, onLoad, onError, data) {
    data = data || null;
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case Error.OK:
          photoData = xhr.response;
          onLoad(xhr.response);
          break;
        case Error.BAD_REQUEST:
          error = 'Неверный запрос. (' + xhr.status + '/' + xhr.statusText + ')';
          break;
        case Error.UNAUTHORIZED:
          error = 'Пользователь не авторизован. (' + xhr.status + '/' + xhr.statusText + ')';
          break;
        case Error.NOT_FOUND:
          error = 'Ничего не найдено. (' + xhr.status + '/' + xhr.statusText + ')';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + '/' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
      onLoad(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open(method, url);
    xhr.send(data);
  }

  function upload(data, onLoad, onError) {
    createXHR('POST', URL_UPLOAD, onLoad, onError, data);
  }

  function load(onLoad, onError) {
    createXHR('GET', URL_LOAD, onLoad, onError);
  }

  function getData(photoId) {
    return photoId ? photoData[photoId] : photoData;
  }

  return {
    getData: getData,
    upload: upload,
    load: load
  };
})();
