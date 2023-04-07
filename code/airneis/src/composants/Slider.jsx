import React, { useState } from 'react';
import Carousel from 'better-react-carousel';

const Gallery = () => {
  const [autoplay, setAutoplay] = useState(true);
  const images = [
    { src: '/img1.jpg', alt: 'image 1' },
    { src: '/img2.jpg', alt: 'image 2' },
    { src: '/img3.jpg', alt: 'image 3' },
    { src: '/img4.jpg', alt: 'image 4' },
    { src: '/img5.jpg', alt: 'image 5' },
    { src: '/img6.jpg', alt: 'image 6' },
    { src: '/img7.jpg', alt: 'image 7' },
  ];

  const handleInteraction = () => {
    setAutoplay(false);
  };

  return (
    <Carousel cols={1} rows={1} gap={10} loop autoplay={autoplay ? 3000 : false} showDots dotColor={"#000000"} dotColorActive={"#333333"} onClick={handleInteraction}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img src={image.src} alt={image.alt} style={{ width: '100%' }} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Gallery;