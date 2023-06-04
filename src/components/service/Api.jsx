import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '34929900-bebe558fd922fdc941c0226a3';

const fetchApi = async (searchQuery, page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  if (response.statu !== 200) {
    console.log('Ooopsss! Not work!');
    throw new Error(response.status);
  }
  if (response.data.total === 0) {
    console.error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  const data = await response.data;
  return data;
};

export default fetchApi;
