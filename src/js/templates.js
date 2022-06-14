import SimpleLightbox from 'simplelightbox';

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
      <ul class="info">
        <li class="info-item">
          <b>Likes</b>
          <span>${likes}</span>
        </li>
        <li class="info-item">
          <b>Views</b>
          <span>${views}</span>
        </li>
        <li class="info-item">
          <b>Comments</b>
          <span>${comments}</span>
        </li>
        <li class="info-item">
          <b>Downloads</b>
          <span>${downloads}</span>
        </li>
      </ul>
    </div>
  </a>`;
      }
    )
    .join('');
}

export { renderMarkup, galleryLightbox };
