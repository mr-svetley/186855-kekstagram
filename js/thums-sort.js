'use strict';

window.thumbsSort = (function () {
  var NUMBER_OF_NEW_THUMBS = 10;
  var DEBOUNCE_INTERVAL = 500;
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
    window.utils.setNoDebounce(DEBOUNCE_INTERVAL, renderDataByPop);
  }

  function onBtnNewClick() {
    btnActiveToggler(btnNew);
    if (!sortedDataByNew) {
      sortedDataByNew = window.utils.generateArrayWithRandonUniqueInteger(NUMBER_OF_NEW_THUMBS, window.backend.getData().length)
        .map(function (id) {
          return window.backend.getData(id);
        });
    }
    window.utils.setNoDebounce(DEBOUNCE_INTERVAL, renderDataByNew);
  }

  function onBtnDiscussedClick() {
    btnActiveToggler(btnDiscussed);
    if (!sortedDataByDiscussed) {
      sortedDataByDiscussed = window.backend.getData().slice(0);
      sortedDataByDiscussed.sort(function (left, right) {
        return right.comments.length - left.comments.length;
      });
    }
    window.utils.setNoDebounce(DEBOUNCE_INTERVAL, renderDataByDiscussed);
  }

  function renderDataByPop() {
    window.photoThumbs.render(sortedDataByPop);
  }
  function renderDataByNew() {
    window.photoThumbs.render(sortedDataByNew);
  }
  function renderDataByDiscussed() {
    window.photoThumbs.render(sortedDataByDiscussed);
  }

  function btnActiveToggler(clickedBtn) {
    btnActive.classList.remove('img-filters__button--active');
    btnActive = clickedBtn;
    btnActive.classList.add('img-filters__button--active');
  }

  function init() {
    filters.classList.remove('img-filters--inactive');
    btnPop.addEventListener('click', onBtnPopClick);
    btnNew.addEventListener('click', onBtnNewClick);
    btnDiscussed.addEventListener('click', onBtnDiscussedClick);
  }

  return {
    init: init
  };
})();
