'use strict';

window.app.photoThumbs = (function () {
  var photoThumbsContainer = document.querySelector('.pictures');
  var photoThumbTemplate = document.querySelector('#picture').content.querySelector('.picture');
  renderPhotoThumbs(window.app.data.get());

  photoThumbsContainer.addEventListener('click', function (evt) {
    var target = evt.target.closest('.picture');
    if (target) {
      evt.preventDefault();
      var photoId = target.dataset.id;
      window.app.photoViewer.open(photoId);
    }
  });

  function renderPhotoThumbs(data) {
    var photosLayout = document.createDocumentFragment();

    data.forEach(function (photoData, index) {
      var thumbTemplate = photoThumbTemplate.cloneNode(true);
      thumbTemplate.dataset.id = index;
      thumbTemplate.querySelector('.picture__img').src = photoData.url;
      thumbTemplate.querySelector('.picture__comments').textContent = photoData.comments.length;
      thumbTemplate.querySelector('.picture__likes').textContent = photoData.likes;
      photosLayout.appendChild(thumbTemplate);
    });

    photoThumbsContainer.appendChild(photosLayout);
  }

  function removePhotoThumbs() {
    var thumbs = photoThumbsContainer.querySelectorAll('.picture');
    thumbs.forEach(function (currentThumbs) {
      currentThumbs.remove();
    });
  }

  function updatePhotoThumbs() {
    window.app.data.update();
    removePhotoThumbs();
    renderPhotoThumbs(window.app.data.get());
  }

  return {
    update: updatePhotoThumbs
  };
})();
