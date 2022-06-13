import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let galleryLightbox = new SimpleLightbox('.photo-link', {
  scrollZoom: true,
  maxZoom: 2,
  doubleTapZoom: 1.5,
  animationSpeed: 150,
  captionDelay: 250,
});

function renderMarkup(response) {
  const dataArray = response.data.hits;

  return dataArray
    .map(
      ({
        likes,
        views,
        comments,
        downloads,
        webformatURL,
        tags,
        largeImageURL,
      }) => {
        return /*html*/ `
  <a class="photo-link" href="${largeImageURL}">
    <div class="photo-card">
      <div class="img-wrap">
        <img class="card-img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
      </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </p>
      </div>
    </div>
  </a>`;
      }
    )
    .join('');
}

export { renderMarkup };
