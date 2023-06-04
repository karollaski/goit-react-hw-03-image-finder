import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '34929900-bebe558fd922fdc941c0226a3';
const NotiflixOptions = {
  distance: '2px',
  cssAnimationStyle: 'from-right',
  showOnlyTheLastOne: 'true',
};

const fetchApi = async (searchQuery, page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  if (response.status !== 200) {
    console.log('Ooopsss! Not work!');
    throw new Error(response.status);
  }
  if (response.data.total === 0) {
    Notiflix.Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.',
      NotiflixOptions
    );
  }

  const data = await response.data;
  return data;
};

export default fetchApi;
