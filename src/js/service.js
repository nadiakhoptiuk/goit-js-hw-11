import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getRefs } from './refs';
import { fetchImages, perPage } from './fetchImages';
import { updateInterface } from '../index';

const refs = getRefs();
let value = '';
let page = 0;

async function getDataFromForm(evt) {
  evt.preventDefault();

  value = evt.currentTarget.elements.searchQuery.value.trim();

  if (!value) {
    return;
  }

  page = 1;
  try {
    const dataRes = await fetchImages(value, page);
    onFormSubmit(dataRes);
    updateInterface(dataRes);
  } catch (error) {
    Notify.failure(error.message);
  }
}

function onFormSubmit(response) {
  refs.gallery.innerHTML = '';
  const countOfImages = response.data.hits.length;

  if (countOfImages === 0) {
    refs.loadMoreBtn.classList.add('hidden');
    refs.form.reset();

    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  if (response.data.totalHits <= countOfImages) {
    refs.loadMoreBtn.classList.add('hidden');
  } else {
    refs.loadMoreBtn.classList.remove('hidden');
  }

  Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
}

async function onLoadMoreBtnClick() {
  page += 1;

  try {
    const dataRes = await fetchImages(value, page);

    if (!isAnyMorePage(dataRes)) {
      refs.loadMoreBtn.classList.add('hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    updateInterface(dataRes);
  } catch (error) {
    Notify.failure(error.message);
  }
}

function isAnyMorePage(response) {
  const currentPage = page;
  const totalPages = Math.ceil(response.data.totalHits / perPage);

  return currentPage === totalPages ? false : true;
}

export { getDataFromForm, onLoadMoreBtnClick };
