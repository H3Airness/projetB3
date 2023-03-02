import React, { useState } from 'react';
import Carousel from 'better-react-carousel';

const Gallery = () => {
  const [autoplay, setAutoplay] = useState(true);
  const images = [
    { src: '../public/img1.jpeg', alt: 'image 1' },
    { src: '../public/img2.jpeg', alt: 'image 2' },
    { src: '../public/img3.jpeg', alt: 'image 3' },
    { src: '../public/img4.jpeg', alt: 'image 4' },
    { src: '../public/img5.jpeg', alt: 'image 5' },
    { src: '../public/img6.jpeg', alt: 'image 6' },
    { src: '../public/img7.jpeg', alt: 'image 7' },
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