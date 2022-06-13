import { getRefs } from './refs';

const refs = getRefs();

function scrollDocument() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export { scrollDocument };
