const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27979980-56564682deb2f4cc3aa0cce1c';

function fetchImages(value, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: value,
    per_page: 40,
    page,
  });

  return fetch(`${BASE_URL}?&${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    return response.json();
  });
}

export { fetchImages };
