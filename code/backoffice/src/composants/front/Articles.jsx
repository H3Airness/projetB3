import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from "../Menu";

const Articles = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/articles.php')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleImageClick = (index) => {
    const image = images[index];

    if (selectedImages.includes(image)) { // Si l'image est déjà sélectionnée, on la désélectionne
      setSelectedImages(selectedImages.filter(selectedImage => selectedImage !== image));
    } else if (selectedImages.length < 3) { // Sinon, si on a moins de 3 images sélectionnées, on ajoute l'image à la sélection
      setSelectedImages([...selectedImages, image]);
    } else { // Sinon, on affiche un message d'alerte
      alert('Vous ne pouvez pas sélectionner plus de 3 images.');
    }
  };

  const handleSubmit = () => {
    axios.post('http://airneis.ddns.net:3000/update_features.php', { id: selectedImages })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
  
  
  

  return (
    <>
      <div>
        <Menu />
      </div>
      <div className="info-airneis mt-5">
        <p>ESPACE ADMINISTRATION AIRNEIS</p>
        <p>SELECTION DES ARTICLES</p>
      </div>

      <div className="cat">
        <div className="content-img">
          {images.map((image, index) => (
            <div
              className={`articles ${selectedImages.includes(image) ? 'selected' : ''}`}
              key={index}
              onClick={() => handleImageClick(index)}
            >
              <p className='text-center'>{image.nom}</p>
              <img width={200} height={200} src={image.source} alt={`image-${index}`} />
              <p className='m-2 text-primary'>Prix : {image.prix} €</p>
              <p className='m-2 text-secondary font-weight-bold'>{image.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center my-3">
        <button onClick={handleSubmit} className='boutonBackOfficeArticles btn btn-primary'>Appliquer</button>
      </div> 
    </>
  );
}

export default Articles;
