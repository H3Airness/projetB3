import React, { useState, useEffect } from 'react';
import Gallery from '../Slider';
import { NavLink } from 'react-router-dom';
import Menu from "../Menu";
import axios from 'axios';

const Accueil = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://airneis.ddns.net:3000/accueil.php');
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div>
        <Menu />
        <Gallery />
      </div>
      <div className="info-airneis mt-5">
        <p>VENANT DES HAUTES TERRES D'ÉCOSSE</p>
        <p>NOS MEUBLES SONT IMMORTELS</p>
      </div>

      <div className="cat">
        <div className="content-img">
          {data.map((item, index) => (
            <div className="col mb-5 mt-5 img1 img2" key={index}>
              <NavLink to={"/"}>
                <img width={500} src={item.url} alt={item.title} />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Accueil;
