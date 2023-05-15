import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gallery from '../Slider';
import { Link } from 'react-router-dom';

const Accueil = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/accueil.php')
      .then(response => setImages(response.data.slice(0, 3)))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div>
        <Gallery />
      </div>
      <div className="info-airneis mt-5">
        <p> VENANT DES HAUTES TERRES D'ÉCOSSE</p>
        <p> NOS MEUBLES SONT IMMORTELS</p>
      </div>

      <div className="cat">
        <div className="content-img">
          {images.map((image, index) => (
            <div className="col mb-5 mt-5 img1 img2" key={index}>
              <Link to={`/Produit/${image.id}`}>
                <img width={400} src={image.source} alt={`image-${index}`} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Accueil;
