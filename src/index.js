import { getRefs } from './js/refs';
import { renderMarkup } from './js/templates';
import './js/service';

const refs = getRefs();

function createGallery(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function drawCards(data) {
  const markup = renderMarkup(data);
  createGallery(markup);
}

export { createGallery, drawCards };
