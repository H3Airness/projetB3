import { NavLink } from "react-router-dom";

const NotFound = () => {
    return ( <>
   <h1 className="p-3 display-2 text-center rounded">Erreur 404 
   <br>
   </br>
   <small>Page introuvable</small></h1>
         <div className="text-center">
            <img src="giphy.gif" alt="" className="mb-2"/>
         </div>
         <div className="bg-dark p-1 mt-5 rounded">
        <a className= "text-white text-center text-decoration-none fs-5"><NavLink to="/" className="nav-link">Retourner sur le catalogue</NavLink></a>
        </div>
   
    </> 
    );
}
 
export default NotFound;