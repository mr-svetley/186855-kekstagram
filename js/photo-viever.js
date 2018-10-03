'use strict';

window.photoViewer = (function () {
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;

  var photoViewer = document.querySelector('.big-picture');
  var photoViewerCancel = photoViewer.querySelector('.big-picture__cancel');
  var photoViewerImg = photoViewer.querySelector('.big-picture__img img');
  var photoViewerCommentCount = photoViewer.querySelector('.comments-count');
  var photoViewerLikesCount = photoViewer.querySelector('.likes-count');
  var photoViewerCaption = photoViewer.querySelector('.social__caption');
  var photoViewerCommentsList = photoViewer.querySelector('.social__comments');

  function closePhotoViewer() {
    photoViewer.classList.add('hidden');
    photoViewerCancel.removeEventListener('click', onPhotoViewerCancelClick);
    document.removeEventListener('keydown', onPhotoViewerEscPress);
  }

  function onPhotoViewerCancelClick() {
    closePhotoViewer();
  }

  function onPhotoViewerEscPress(evt) {
    window.utils.isEscEvent(evt, closePhotoViewer);
  }

  return {
    open: function (photoId) {
      var photoData = window.backend.getData(photoId);
      photoViewerImg.src = photoData.url;
      photoViewerCommentCount.textContent = photoData.comments.length;
      photoViewerLikesCount.textContent = photoData.likes;
      photoViewerCaption.textContent = photoData.description;
      photoViewerCommentsList.innerHTML = '';

      var comments = document.createDocumentFragment();

      photoData.comments.forEach(function (comment) {
        var commentLayout = document.createElement('li');
        commentLayout.classList.add('social__comment', 'social__comment--text');

        var commentImg = new Image(AVATAR_WIDTH, AVATAR_HEIGHT);
        commentImg.src = 'img/avatar-' + window.utils.generateRandomInteger(6, 1) + '.svg';
        commentImg.classList.add('social__picture');
        commentImg.alt = 'Аватар комментатора фотографии';

        var commentText = document.createElement('p');
        commentText.classList.add('social__text');
        commentText.textContent = comment;

        commentLayout.appendChild(commentImg);
        commentLayout.appendChild(commentText);

        comments.appendChild(commentLayout);
      });

      photoViewerCommentsList.appendChild(comments);

      photoViewer.classList.remove('hidden');

      document.addEventListener('keydown', onPhotoViewerEscPress);
      photoViewerCancel.addEventListener('click', onPhotoViewerCancelClick);
    }
  };
})();
