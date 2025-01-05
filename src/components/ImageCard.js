import React from 'react';
import { Link } from 'react-router-dom';

const ImageCard = React.forwardRef(({ image, openModal }, ref) => {
  return (
    <div
      ref={ref}
      className="image-container"
      onClick={() => openModal(image)}
    >
      <div className="image-frame">
        <img src={`/img/${image}`} className="meme-image" />
        <div className="image-caption">#{image.split('.')[0]}</div>
      </div>
    </div>
  );
});

export default ImageCard;
