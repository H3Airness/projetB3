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
         
            <div className="col mb-5 mt-5 img1 img2">
              <center>
                <Link to={`/Categorie/armoire`}>
                  <img width={100} src={"http://airneis.ddns.net:3001/armoire/armoire.jpg"} alt={`armoire`} />
                  <p className='categorie'>Armoire</p>
                </Link>
              </center>
            </div>

            <div className="col mb-5 mt-5 img1 img2">
              <center>
                <Link to={`/Categorie/bureau`}>
                  <img width={100} src={"http://airneis.ddns.net:3001/bureau/bureau.jpg"} alt={`bureau`} />
                  <p className='categorie'>Bureau</p>
                </Link>
              </center>
            </div>

            <div className="col mb-5 mt-5 img1 img2">
              <center>
                <Link to={`/Categorie/canape`}>
                  <img width={100} src={"http://airneis.ddns.net:3001/canape/canape.jpg"} alt={`canape`} />
                  <p className='categorie'>Canapé</p>
                </Link>
              </center>
            </div>

            <div className="col mb-5 mt-5 img1 img2">
              <center>
                <Link to={`/Categorie/chaise`}>
                  <img width={100} src={"http://airneis.ddns.net:3001/chaise/chaise.jpg"} alt={`chaise`} />
                  <p className='categorie'>Chaise</p>
                </Link>
              </center>
            </div>

            <div className="col mb-5 mt-5 img1 img2">
              <center>
                <Link to={`/Categorie/fauteuil`}>
                  <img width={100} src={"http://airneis.ddns.net:3001/fauteuil/fauteuil.jpg"} alt={`fauteuil`} />
                  <p className='categorie'>Fauteuil</p>
                </Link>
              </center>
            </div>

            <div className="col mb-5 mt-5 img1 img2">
              <center>
                <Link to={`/Categorie/lit`}>
                  <img width={100} src={"http://airneis.ddns.net:3001/lit/lit.jpg"} alt={`lit`} />
                  <p className='categorie'>Lit</p>
                </Link>
              </center>
            </div>

            <div className="col mb-5 mt-5 img1 img2">
              <center>
                <Link to={`/Categorie/table`}>
                  <img width={100} src={"http://airneis.ddns.net:3001/table/table.jpg"} alt={`table`} />
                  <p className='categorie'>Table</p>
                </Link>
              </center>
            </div>

        </div>
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
