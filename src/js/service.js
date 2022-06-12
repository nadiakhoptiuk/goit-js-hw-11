import { getRefs } from './refs';
import { fetchImages } from './fetchImages';
import { drawCards } from '../index';

export const refs = getRefs();
let value = '';
let page = 0;

refs.form.addEventListener('submit', getDataFromForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function getDataFromForm(evt) {
  evt.preventDefault();

  value = evt.currentTarget.elements.searchQuery.value.trim();

  if (!value) {
    return;
  }

  page = 1;
  fetchImages(value, page).then(onSuccessInput).catch(console.log);
}

function onSuccessInput(data) {
  refs.gallery.innerHTML = '';
  drawCards(data);

  refs.loadMoreBtn.classList.remove('hidden');
}

function onLoadMoreBtnClick() {
  page += 1;

  fetchImages(value, page).then(drawCards).catch(console.log);
}
