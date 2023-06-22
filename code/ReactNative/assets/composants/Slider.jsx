import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';

const Gallery = () => {
  const [autoplay, setAutoplay] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/carousel/affichage_carousel.php')
      .then(response => setImages(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleInteraction = () => {
    setAutoplay(false);
  };

  const renderCarouselItem = ({ item }) => (
    <Image
      source={{ uri: `http://airneis.ddns.net:3000/img/carousel/${item.id}.jpg` }}
      alt={item.id}
      style={{ width: '100%', height: 200 }}
    />
  );

  return (
    <Carousel
      data={images}
      renderItem={renderCarouselItem}
      sliderWidth={300}
      itemWidth={300}
      loop={true}
      autoplay={autoplay}
      autoplayInterval={3000}
      onSnapToItem={handleInteraction}
    />
  );
};

export default Gallery;
