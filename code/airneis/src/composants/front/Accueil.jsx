import React from 'react';
import Gallery from '../Slider';
import { NavLink } from 'react-router-dom';
import Menu from "../Menu";


const Accueil = () => {

  return ( <>
    
  <div>
    <Menu/>
    <Gallery />
  </div>
  <div className="info-airneis mt-5">
    <p> VENANT DES HAUTES TERRES D'ÉCOSSE</p>
    <p> NOS MEUBLES SONT IMMORTELS AH</p>
  </div>

  <div className="cat">
    <div className="content-img">
      <div className="col mb-5 mt-5 img1 img2">
        <NavLink to={"/"}>
          <img width={400} src={"https://picsum.photos/800/600?random=1"} class='img-thumbnail'/> 
        </NavLink>
      </div>
      <div className="col mb-5 mt-5 img1 img2">
        <NavLink to={"/"}>
          <img width={400} src={"https://picsum.photos/800/600?random=2"} class='img-thumbnail' />
        </NavLink>
      </div>
      <div className="col mb-5 mt-5 img1 img2">
        <NavLink to={"/"}>
          <img width={400} src={"https://picsum.photos/800/600?random=3"} class='img-thumbnail' />
        </NavLink>
      </div>
    </div>
  </div>
    </> );
}

export default Accueil ;

