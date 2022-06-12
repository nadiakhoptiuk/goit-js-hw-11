function renderMarkup(data) {
  const dataArray = data.hits;

  return dataArray
    .map(({ likes, views, comments, downloads, webformatURL, tags }) => {
      return /*html*/ `
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
    </div>`;
    })
    .join('');
}

export { renderMarkup };
