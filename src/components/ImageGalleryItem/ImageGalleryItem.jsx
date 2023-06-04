import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ previewImage, tags, selectedImage }) => {
  <li className={css.ImageGalleryItem}>
    <img
      className={css.ImageGalleryItem__image}
      src={previewImage}
      alt={tags}
      onClick={selectedImage}
    />
  </li>;
};

ImageGalleryItem.proptypes = {
  previewImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  selectedImage: PropTypes.func,
};

export default ImageGalleryItem;
