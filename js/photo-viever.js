'use strict';

window.photoViewer = (function () {
  var AVATAR_WIDTH = 35;
  var AVATAR_HEIGHT = 35;
  var NUMBER_OF_COMMENTS = 5;

  var photoViewer = document.querySelector('.big-picture');
  var photoViewerCancel = photoViewer.querySelector('.big-picture__cancel');
  var photoViewerImg = photoViewer.querySelector('.big-picture__img img');
  var photoViewerCommentCount = photoViewer.querySelector('.comments-count');
  var photoViewerLikesCount = photoViewer.querySelector('.likes-count');
  var photoViewerCaption = photoViewer.querySelector('.social__caption');
  var photoViewerCommentsList = photoViewer.querySelector('.social__comments');
  var photoViewerCommentsBtn = photoViewer.querySelector('.comments-loader');
  var photoViewerNumberOfActiveComment = photoViewer.querySelector('.social__comment-count');
  var currentPhotoData;
  var currentComentPosition = 0;
  var commentListStatus;

  function closePhotoViewer() {
    photoViewer.classList.add('hidden');
    photoViewerCancel.removeEventListener('click', onPhotoViewerCancelClick);
    document.removeEventListener('keydown', onPhotoViewerEscPress);
    photoViewerCommentsBtn.removeEventListener('click', onPhotoViewerCommentsBtnClick);
    photoViewerCommentsBtn.classList.remove('hidden');
    currentComentPosition = 0;
  }

  function onPhotoViewerCancelClick() {
    closePhotoViewer();
  }

  function onPhotoViewerEscPress(evt) {
    window.utils.isEscEvent(evt, closePhotoViewer);
  }

  function renderComments(comments, container) {
    var pieceOfComents = document.createDocumentFragment();
    commentListStatus = 'ok';

    for (var i = currentComentPosition; i < (currentComentPosition + NUMBER_OF_COMMENTS); i++) {
      if (typeof comments[i] === 'undefined') {
        commentListStatus = 'endList';
        break;
      }
      var commentLayout = document.createElement('li');
      commentLayout.classList.add('social__comment', 'social__comment--text');

      var commentImg = new Image(AVATAR_WIDTH, AVATAR_HEIGHT);
      commentImg.src = 'img/avatar-' + window.utils.generateRandomInteger(6, 1) + '.svg';
      commentImg.classList.add('social__picture');
      commentImg.alt = 'Аватар комментатора фотографии';

      var commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = comments[i];

      commentLayout.appendChild(commentImg);
      commentLayout.appendChild(commentText);

      pieceOfComents.appendChild(commentLayout);
    }

    container.appendChild(pieceOfComents);
    currentComentPosition = i;
    photoViewerNumberOfActiveComment.childNodes[0].textContent = currentComentPosition + ' из ';
  }

  function onPhotoViewerCommentsBtnClick() {
    renderComments(currentPhotoData.comments, photoViewerCommentsList);
    if (commentListStatus === 'endList') {
      photoViewerCommentsBtn.classList.add('hidden');
    }
  }

  function open(photoId) {
    currentPhotoData = window.backend.getData(photoId);
    photoViewerImg.src = currentPhotoData.url;
    photoViewerCommentCount.textContent = currentPhotoData.comments.length;
    photoViewerLikesCount.textContent = currentPhotoData.likes;
    photoViewerCaption.textContent = currentPhotoData.description;
    photoViewerCommentsList.innerHTML = '';

    photoViewerCommentsBtn.addEventListener('click', onPhotoViewerCommentsBtnClick);

    renderComments(currentPhotoData.comments, photoViewerCommentsList);
    if (currentPhotoData.comments.length <= currentComentPosition) {
      photoViewerCommentsBtn.classList.add('hidden');
    }

    photoViewer.classList.remove('hidden');

    document.addEventListener('keydown', onPhotoViewerEscPress);
    photoViewerCancel.addEventListener('click', onPhotoViewerCancelClick);
  }

  return {
    open: open
  };
})();
