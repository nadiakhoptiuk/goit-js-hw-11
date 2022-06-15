import { getRefs } from './refs';
import { loadImages } from './service';

const refs = getRefs();

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(handleIntersection, options);

// створили ціль і активували стеження за нею
const target = refs.spinners;
console.log(target);

observer.observe(target);

function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    console.log(entry.isIntersecting);

    if (entry.isIntersecting) {
      loadImages();
    }
  });
}

export { observer, handleIntersection };
