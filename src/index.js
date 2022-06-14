import 'simplelightbox/dist/simple-lightbox.min.css';

import { renderMarkup, galleryLightbox } from './js/templates';
import { getDataFromForm, onLoadMoreBtnClick } from './js/service';
import { scrollDocument } from './js/scroll';
import { getRefs } from './js/refs';

const refs = getRefs();
refs.form.addEventListener('submit', getDataFromForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function drawCards(data) {
  const markup = renderMarkup(data);
  createGallery(markup);
}

function createGallery(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function updateInterface(response) {
  drawCards(response);
  scrollDocument();
}

export { updateInterface };
