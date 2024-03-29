import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const key = '39768210-58261750239bfb23b413c7964';

export async function searchImages(inputText, page) {
  const perPage = 40;
  const url = `${BASE_URL}/?key=${key}&q=${inputText}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  const { data } = await axios.get(url);
  return data;
}
