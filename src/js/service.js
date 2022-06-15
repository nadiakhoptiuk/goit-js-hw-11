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
    refs.spinners.classList.add('d-none');
  } else {
    refs.spinners.classList.remove('d-none');
  }

  Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
}

async function loadImages() {
  console.log(page);

  page += 1;
  console.log(page);

  try {
    const dataRes = await fetchImages(value, page);

    if (!isAnyMorePage(dataRes)) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      refs.spinners.classList.add('d-none');
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

export { getDataFromForm, loadImages };
