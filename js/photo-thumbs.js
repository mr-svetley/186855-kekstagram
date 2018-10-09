'use strict';

window.photoThumbs = (function () {
  var photoThumbsContainer = document.querySelector('.pictures');
  var photoThumbTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var currentPhotoThumbs = [];

  window.backend.load(initPhotoThumbs, function (error) {
    throw error;
  });

  function initPhotoThumbs(data) {
    window.thumbsSort.init();
    renderPhotoThumbs(data);
  }

  photoThumbsContainer.addEventListener('click', function (evt) {
    var target = evt.target.closest('.picture');
    if (target) {
      evt.preventDefault();
      var photoId = target.dataset.id;
      window.photoViewer.open(photoId);
    }
  });

  function removePhotoThumbs() {
    currentPhotoThumbs.forEach(function (currentThumbs) {
      currentThumbs.remove();
    });
    currentPhotoThumbs = [];
  }

  function renderPhotoThumbs(data) {
    var photosLayout = document.createDocumentFragment();

    data.forEach(function (photoData, index) {
      var thumbTemplate = photoThumbTemplate.cloneNode(true);
      thumbTemplate.dataset.id = index;
      thumbTemplate.querySelector('.picture__img').src = photoData.url;
      thumbTemplate.querySelector('.picture__comments').textContent = photoData.comments.length;
      thumbTemplate.querySelector('.picture__likes').textContent = photoData.likes;
      photosLayout.appendChild(thumbTemplate);
      currentPhotoThumbs.push(thumbTemplate);
    });

    photoThumbsContainer.appendChild(photosLayout);
  }

  return {
    render: renderPhotoThumbs,
    remove: removePhotoThumbs
  };
})();
