import css from './App.module.css';
import Notiflix from 'notiflix';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import fetchApi from './service/Api';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    selectedImage: null,
    alt: null,
    status: 'idle',
    error: null,
  };
  totalHits = null;
  NotiflixOptions = {
    distance: '2px',
    cssAnimationStyle: 'from-right',
    showOnlyTheLastOne: 'true',
  };

  async componentDidUpdate(_, prevState) {
    const { page, searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: 'pending' });
    }

    try {
      const imageData = await fetchApi(searchQuery, page);
      this.totalHits = imageData.total;
      const ImagesHits = imageData.hits;

      if (!ImagesHits) {
        Notiflix.Notify.warning(
          'No results were found for your search, please try something else.',
          this.NotiflixOptions
        );
      }
      this.setState(({ images }) => ({
        images: [...images, ...ImagesHits],
        status: 'resolved',
      }));
      this.setState(console.log([...ImagesHits]));
    } catch (error) {
      console.error(`Sorry something went wrong. ${error.message}`);
      this.setState({ status: 'rejected' });
    }
  }

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery: searchQuery });
  };

  handleSelectedImage = (largeImageUrl, tags) => {
    this.setState({ selectedImage: largeImageUrl, alt: tags });
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      selectedImage: null,
      alt: null,
      status: 'idle',
    });
  };

  render() {
    const { images } = this.state;
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery>
          {images.map(({ id, webformatURL, tags }) => (
            <ImageGalleryItem
              key={id}
              previewImg={webformatURL}
              tags={tags}
              selectedImage={this.handleSelectedImage}
            />
          ))}
        </ImageGallery>
      </div>
    );
  }
}

export default App;
