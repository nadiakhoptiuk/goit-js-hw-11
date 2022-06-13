const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27979980-56564682deb2f4cc3aa0cce1c';
const perPage = 40;

function fetchImages(value, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: value,
    per_page: perPage,
    page,
  });

  return fetch(`${BASE_URL}?&${searchParams}`).then(response =>
    response.json()
  );
}

export { fetchImages, perPage };
