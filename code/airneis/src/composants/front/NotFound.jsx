import { NavLink } from "react-router-dom";

const NotFound = () => {
    return ( <>
    <div className="bg-warning rounded">
        <h1>Erreur 404</h1>
        <a className="text-primary text-decoration-none fs-4"><NavLink to="/" className="nav-link">Acceuil</NavLink></a>
    </div>
    </> 
    );
}
 
export default NotFound;