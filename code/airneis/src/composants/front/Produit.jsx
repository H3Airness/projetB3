import {useParams , useNavigate} from "react-router-dom"
import {useEffect , useState} from "react"
import Menu from "../Menu";


const {id} = useParams();
const navigate = useNavigate();
const [donnees, setProduit] = useState({})
useEffect( () => {
    if(id){
        axios.get(`http://airneis.ddns.net:3000/produit.php?id=${match.params.id}`)
        .then( reponse => {
            if(reponse.data) return setProduit(reponse.data)
            // si l'id saisit dans l'url ne correspond à aucun article en 
            // base de données 
            // redirection vers une page 404 Not Found 
            navigate("/not-found")
        })
        .catch((ex) => {
            console.log(ex)
        })
    }
}, [])


const Produit = () => {
    return ( <>
        <Menu/>
        {donnees.map(donnee => (
            <div key={donnee.id}>

                <header className="d-flex justify-content-between align-items-center">
                    <h1>{donnee.titre}</h1>
                </header>
                <div className="row p-0">
                    <div className="col-8 article_contenu" >
                        {donnee.description}
                    </div>
                    <figure className="col-4">
                        <img src={donnee.img} alt="" className="img-thumbnail" />
                    </figure>
                </div>
            </div>
        ))}
 
    </> );
}
 
export default Produit;