import 'simplelightbox/dist/simple-lightbox.min.css';

import { renderMarkup, galleryLightbox } from './js/templates';
import { getDataFromForm } from './js/service';
import { scrollDocument } from './js/scroll';
import { getRefs } from './js/refs';
import { observer, handleIntersection } from './js/infiniteScroll';

const refs = getRefs();
refs.form.addEventListener('submit', getDataFromForm);

function drawCards(data) {
  const markup = renderMarkup(data);
  createGallery(markup);
  galleryLightbox.refresh();
}

function createGallery(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function updateInterface(response) {
  drawCards(response);
  scrollDocument();
}

export { updateInterface, drawCards };
