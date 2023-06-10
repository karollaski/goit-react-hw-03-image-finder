import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  isShowModal = () => {
    this.setState({
      showModal: true,
    });
  };

  onCloseModal = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { showModal } = this.state;
    const { image } = this.props;

    return (
      <li className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItem__image}
          src={image.webformatURL}
          alt={image.tags}
          onClick={this.isShowModal}
        />
        {showModal ? (
          <Modal
            largeImageUrl={image.largeImageURL}
            tags={image.tags}
            onClose={this.onCloseModal}
          />
        ) : null}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
