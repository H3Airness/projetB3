import { AuthContext } from "../context/authContext";
import React, { useContext } from "react";

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
              <h1 className="text-center">Vous ne pouvez pas acceder à cette page sans vous connecter</h1>
            </>
          )}
    </>
  );
}

export default MesParametres;
