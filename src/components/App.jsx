import css from './App.module.css';
import Notiflix from 'notiflix';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';

import { Component } from 'react';
import fetchApi from './service/Api';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    totalPages: 0,
    currentPage: 1,
    isLoading: false,
  };

  NotiflixOptions = {
    distance: '2px',
    cssAnimationStyle: 'from-right',
    showOnlyTheLastOne: 'true',
  };

  componentDidUpdate(_, prevState) {
    if (
      // prevState.page !== this.state.page ||
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.getImages(this.state.searchQuery, this.state.page);
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  getImages = async () => {
    const { searchQuery, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const imageData = await fetchApi(searchQuery, page);
      // this.totalHits = imageData.total;
      const imagesHits = imageData.hits;
      if (!imagesHits.length) {
        Notiflix.Notify.warning(
          'No results were found for your search, please try something else.',
          this.NotiflixOptions
        );
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...imagesHits],
        totalPages: Math.ceil(imageData.totalHits / 12),
        isLoading: false,
      }));
    } catch (error) {
      console.error(`Sorry something went wrong. ${error.message}`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery: searchQuery });
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      totalPages: 0,
    });
  };

  render() {
    console.log(this.state.page);
    const { images, totalPages, page, isLoading } = this.state;
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleFormSubmit} />

        {images.length > 0 ? (
          <ImageGallery
            images={images}
            selectedImage={this.handleSelectedImage}
          />
        ) : null}

        {isLoading ? <Loader /> : null}

        {images.length > 0 && totalPages !== page && !isLoading ? (
          <Button onClick={this.loadMore} />
        ) : null}
      </div>
    );
  }
}

export default App;
