import React, { useState, useEffect, useRef } from 'react';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const observer = useRef();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/images.json');
        const imagesList = await response.json();
        const shuffledImages = imagesList.sort(() => Math.random() - 0.5);
        setImages(shuffledImages);
        setVisibleImages(shuffledImages.slice(0, 10));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    const newImages = images.slice(visibleImages.length, visibleImages.length + 10);
    setVisibleImages(prev => [...prev, ...newImages]);
  }, [page]);

  const lastImageRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    const handleObserver = entries => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage(prev => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (lastImageRef.current) {
      observer.current.observe(lastImageRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [lastImageRef, visibleImages]);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="gallery">
      <h1>设出来了</h1>
      <div className="image-grid">
        {visibleImages.map((image, index) => {
          const isLastImage = index === visibleImages.length - 1;
          return (
            <ImageCard
              key={image}
              image={image}
              openModal={openModal}
              ref={isLastImage ? lastImageRef : null}
            />
          );
        })}
      </div>

      {isModalOpen && (
        <ImageModal
          selectedImage={selectedImage}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Gallery;
