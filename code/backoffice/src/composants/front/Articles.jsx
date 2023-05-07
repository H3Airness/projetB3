import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from "../Menu";

const Articles = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/articles.php')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleImageClick = (index) => {
    const image = images[index];

    if(selectedImages.includes(image)) 
    {
      setSelectedImages(selectedImages.filter(selectedImage => selectedImage !== image));
    }
    else if(selectedImages.length < 3) 
    {
      setSelectedImages([...selectedImages, image]);
    } 
    else 
    {
      alert('Vous ne pouvez pas sélectionner plus de 3 images.');
    }
  };

  const handleSubmit = () => {
    const data = { images: selectedImages };

    if(selectedImages < 1)
    {
      alert("Veuillez choisir au moins un article !");
    }
    else
    {
      axios.post('http://airneis.ddns.net:3000/update_features.php', data)
        .then(response => {
          // Récupérer le message envoyé par le serveur
          const message = response.data.message;
          // Stocker le message dans la variable d'état "message"
          setMessage(message);
          // Afficher le message dans la console du navigateur
          console.log(message);
        })
        .catch(error => console.log(error));
    }    
  }

  const handleDelete = () => {
    const data = { images: selectedImages };

    if(selectedImages < 1)
    {
      alert("Veuillez choisir au moins un article !");
    }
    else
    {
      axios.post('http://airneis.ddns.net:3000/delete_articles.php', data)
        .then(response => {
          // Récupérer le message envoyé par le serveur
          const message = response.data.message;
          // Stocker le message dans la variable d'état "message"
          setMessage(message);
          // Afficher le message dans la console du navigateur
          console.log(message);

          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
        })
        .catch(error => console.log(error));
    }    
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

      <div className='mt-4'>
        {message && <p className='alert alert-success text-center'>{message}</p>}
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
        <button onClick={handleDelete} className='boutonBackOfficeArticles btn btn-danger'>Supprimer des articles</button>
        <button onClick={handleSubmit} className='boutonBackOfficeArticles btn btn-primary'>Mettre en exposition</button>
      </div>
      <div className="d-flex justify-content-center my-3">
      <button className='boutonBackOfficeArticles btn btn-success'>Ajouter des nouveaux articles</button>
      </div> 
    </>
  );
}

export default Articles;
