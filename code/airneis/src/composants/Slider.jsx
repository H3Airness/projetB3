import React, { useState } from 'react';
import Carousel from 'better-react-carousel';

const Gallery = () => {
  const [autoplay, setAutoplay] = useState(true);
  const images = [
    { src: 'https://t4.ftcdn.net/jpg/02/86/03/97/240_F_286039798_bSv7AUnD51WfrgG5w0rSabV3ujNvLgTn.jpg', alt: 'image 1' },
    { src: 'https://t4.ftcdn.net/jpg/05/42/62/23/240_F_542622306_WJVksyeDFbSNe1xYr4EF8VMn4vgvUAq9.jpg', alt: 'image 2' },
    { src: 'https://t4.ftcdn.net/jpg/04/52/66/91/240_F_452669128_ro9I4dD0DxEKuCubfMJgWRQRpS2csaSP.jpg', alt: 'image 3' },
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