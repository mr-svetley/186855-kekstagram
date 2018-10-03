'use strict';

window.thumbsSort = (function () {
  var NUMBER_OF_NEW_THUMBS = 10;
  var filters = document.querySelector('.img-filters');
  var btnPop = filters.querySelector('#filter-popular');
  var btnNew = filters.querySelector('#filter-new');
  var btnDiscussed = filters.querySelector('#filter-discussed');
  var btnActive = filters.querySelector('.img-filters__button--active');

  var sortedDataByPop;
  var sortedDataByNew;
  var sortedDataByDiscussed;

  function onBtnPopClick() {
    btnActiveToggler(btnPop);
    if (!sortedDataByPop) {
      sortedDataByPop = window.backend.getData();
    }
    window.photoThumbs.render(sortedDataByPop);
  }

  function onBtnNewClick() {
    btnActiveToggler(btnNew);
    if (!sortedDataByNew) {
      sortedDataByNew = window.utils.generateArrayWithRandonUniqueInteger(NUMBER_OF_NEW_THUMBS, window.backend.getData().length)
        .map(function (id) {
          return window.backend.getData(id);
        });
    }
    window.photoThumbs.render(sortedDataByNew);
  }

  function onBtnDiscussedClick() {
    btnActiveToggler(btnDiscussed);
    if (!sortedDataByDiscussed) {
      sortedDataByDiscussed = window.backend.getData().slice(0);
      sortedDataByDiscussed.sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
    }
    window.photoThumbs.render(sortedDataByDiscussed);
  }

  function btnActiveToggler(clickedBtn) {
    btnActive.classList.remove('img-filters__button--active');
    btnActive = clickedBtn;
    btnActive.classList.add('img-filters__button--active');
  }

  return {
    init: function () {
      filters.classList.remove('img-filters--inactive');
      btnPop.addEventListener('click', onBtnPopClick);
      btnNew.addEventListener('click', onBtnNewClick);
      btnDiscussed.addEventListener('click', onBtnDiscussedClick);
    }
  };
})();
