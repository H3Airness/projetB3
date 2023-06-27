import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { dataContext } from "../context/dataContext";
import Carousel from 'better-react-carousel';

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function Produit() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [produit, setProduct] = useState(null);
  const [produits, setProducts] = useState([]);
  const { ajouter } = useContext(dataContext);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    fetch(`http://airneis.ddns.net:3000/produit.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.categorie);
        setProduct(data);
        if (data && data.categorie) {
          axios.get(`http://airneis.ddns.net:3000/categorie/affichage_categorie.php?categorie=${data.categorie}`)
            .then(response => {
              console.log(response.data);
              setCategories(response.data);
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.error(error));
  }, [id]);

  useEffect(() => {
    axios.get(`http://airneis.ddns.net:3000/categorie/categorie.php?categorie=${produit?.categorie}`)
      .then(response => {
        console.log(response.data);
        const shuffledProducts = shuffleArray(response.data);
        const filteredProducts = shuffledProducts.filter(p => p.id !== produit.id);
        setProducts(filteredProducts.slice(0, 3));
      })
      .catch(error => console.error(error));
  }, [produit]);

  const handleInteraction = () => {
    setAutoplay(false);
  };

  if (!produit) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      {categories.length > 0 && categories[0] && (
        <>
          <Link to={`/Categorie/${categories[0].id_categorie}`}>
            <img
              className='mb-5'
              src={`http://airneis.ddns.net:3000/img_categorie/${categories[0].id_categorie}banniere.jpg`}
              alt={categories[0].nom}
              style={{ width: '100%' }}
            />
          </Link>

          <div className="cat d-flex justify-content-center">
            <div className='photo'>
              <Carousel cols={1} rows={1} gap={10} loop autoplay={autoplay ? 5000 : false} showDots dotColor="#000000" dotColorActive="#333333" onClick={handleInteraction}>
                <Carousel.Item>
                  <img className="rounded mx-auto d-block imgproduit" width="70%" style={{ minWidth: '100px' }} src={`http://airneis.ddns.net:3000/img_produit/${produit.id}.jpg`} alt={produit.titre}/>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="rounded mx-auto d-block imgproduit" width="70%" style={{ minWidth: '100px' }} src={`http://airneis.ddns.net:3000/img_produit/${produit.id}-2.jpg`} alt={produit.titre}/>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="rounded mx-auto d-block imgproduit" width="70%" style={{ minWidth: '100px' }} src={`http://airneis.ddns.net:3000/img_produit/${produit.id}-3.jpg`} alt={produit.titre}/>
                </Carousel.Item>
              </Carousel>
            </div>

            <div className='description'>
              <div className="cat d-flex justify-content-between">
                <div className="prix">{produit.prix}€</div>
                <div className="titreProduit">&ensp;&ensp;{produit.nom}</div>
              </div>

              <div className="d-flex justify-content-end">
                {produit.stock > 1 ? (
                  <p className='text-success'>En stock</p>
                ) : null}

                {produit.stock == 1 ? (
                  <p className='text-danger'>Plus que 1 produit en stock !</p>
                ) : null }

                {produit.stock == 0 ? (
                  <p className='text-danger'>Stock épuisé</p>
                ) : null }
              </div>

              <p>{produit.description}</p>
              <center>
                {produit.stock > 0 ? (
                  <button className="btn btn-primary" onClick={() => ajouter(produit)}>
                    <span>Ajouter au panier</span>
                  </button>
                ) : (
                  <button className="btn btn-danger" disabled>
                    <span>Stock épuisé</span>
                  </button>
                )}
              </center>
            </div>
          </div>

          <p className='mt-5 info-airneis'>Produit similaires</p>

          <div className="container mt-4">
            <div className="row justify-content-center">
              {produits.map(produit => (
                <div className="col-md-4 mb-3" key={produit.id}>
                  <div className="card">
                    <Link to={`/Produit/${produit.id}`}>
                      <img
                        className="card-img-top"
                        src={`http://airneis.ddns.net:3000/img_produit/${produit.id}`}
                        alt={produit.titre}
                        style={{ objectFit: 'cover', height: '300px' }}
                      />
                    </Link>

                    <div className="card-body">
                      <h5 className="card-title">{produit.nom}</h5>
                      <p className="card-text">{produit.prix}€</p>
                      <center>
                        {produit.stock > 0 ? (
                          <button className="btn btn-primary" onClick={() => ajouter(produit)}>
                            <span>Ajouter au panier</span>
                          </button>
                        ) : (
                          <button className="btn btn-danger" disabled>
                            <span>Stock épuisé</span>
                          </button>
                        )}
                      </center>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Produit;
