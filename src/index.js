// import 'simplelightbox/dist/simple-lightbox.min.css';

import './js/templates';
import './js/service';

import { renderMarkup, galleryLightbox } from './js/templates';
import { refs } from './js/service';
import { scrollDocument } from './js/scroll';

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
