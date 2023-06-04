import PropTypes from 'prop-types';
import css from './ImageGalley.module.css';

const ImageGallery = ({ children }) => (
  <ul className={css.ImageGallery}>{children}</ul>
);

ImageGallery.propTypes = {
  children: PropTypes.node,
};

export default ImageGallery;
