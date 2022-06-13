import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getRefs } from './refs';
import { fetchImages, perPage } from './fetchImages';
import { drawCards } from '../index';

export const refs = getRefs();
let value = '';
let page = 0;

refs.form.addEventListener('submit', getDataFromForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function getDataFromForm(evt) {
  evt.preventDefault();

  value = evt.currentTarget.elements.searchQuery.value.trim();

  if (!value) {
    return;
  }

  page = 1;
  fetchImages(value, page)
    .then(onFormSubmit)
    .catch(error => Notify.failure(error));
}

function onFormSubmit(data) {
  refs.gallery.innerHTML = '';

  if (data.hits.length === 0) {
    refs.form.reset();

    return Promise.reject(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  drawCards(data);
  Notify.success(`Hooray! We found ${data.totalHits} images.`);

  refs.loadMoreBtn.classList.remove('hidden');
}

function onLoadMoreBtnClick() {
  page += 1;
  const totalPage = fetchImages(value, page)
    .then(isAnyMorePages)
    .catch(error => Notify.failure(error.message));
}

function isAnyMorePages(data) {
  const currentPage = page;
  const totalPages = Math.ceil(data.totalHits / perPage);

  if (currentPage === totalPages) {
    console.log(refs.loadMoreBtn);

    refs.loadMoreBtn.classList.add('hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  drawCards(data);
}
