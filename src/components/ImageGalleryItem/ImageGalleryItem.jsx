import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ previewImg, tags, selectedImage }) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItem__image}
        src={previewImg}
        alt={tags}
        onClick={selectedImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  previewImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  selectedImage: PropTypes.func,
};

export default ImageGalleryItem;
