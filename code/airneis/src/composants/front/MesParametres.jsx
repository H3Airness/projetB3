import { AuthContext } from "../context/authContext";
import React, { useContext } from "react";
import Connexion from "./Connexion";

function MesParametres() {
    const { isLoggedIn } = useContext(AuthContext);
 

  return (
    <>
    {isLoggedIn ? (
            <>
              <h1 className="text-center">Récapitulatif de votre compte</h1>

            </>
          ) : (
            <>
              <Connexion/>
            </>
          )}
    </>
  );
}

export default MesParametres;
